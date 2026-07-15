// Client-side store for the dev image uploader (option 1: browser-only preview).
//
// Uploaded designs live in IndexedDB — a card image can be several MB, well past
// localStorage's ~5MB ceiling — keyed by card id, as the raw Blob. Nothing is
// sent to the server; these overrides exist only in the viewer's own browser, so
// they're a way to *try* a design in place, not to publish it.

const DB_NAME = "overview-card-images";
const STORE = "images";
const CHANGE_EVENT = "overview-image-change";

/**
 * The uploader shows in local dev, or anywhere with `?upload=1` on the URL — the
 * same escape hatch the shape tuner uses, so designs can be tried against the
 * real deployment too. Guarded for SSR: it touches `window`.
 */
export function isUploaderEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV === "development") return true;
  return new URLSearchParams(window.location.search).get("upload") === "1";
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(STORE, mode).objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export function getCardImage(id: string): Promise<Blob | undefined> {
  return tx("readonly", (s) => s.get(id) as IDBRequest<Blob | undefined>);
}

export async function setCardImage(id: string, blob: Blob): Promise<void> {
  await tx("readwrite", (s) => s.put(blob, id));
  announce(id);
}

export async function clearCardImage(id: string): Promise<void> {
  await tx("readwrite", (s) => s.delete(id));
  announce(id);
}

// The uploader panel and the card backgrounds are in different parts of the tree,
// so a change in one has to reach the other. A window event carrying the card id
// is the lightest coupling that does it.
function announce(id: string) {
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { id } }));
}

export function onCardImageChange(id: string, cb: () => void): () => void {
  const handler = (e: Event) => {
    if ((e as CustomEvent<{ id: string }>).detail?.id === id) cb();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

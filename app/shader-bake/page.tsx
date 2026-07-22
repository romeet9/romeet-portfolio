import { notFound } from "next/navigation";

import { BakeBoard } from "./bake-board";

/**
 * Dev-only tool page for regenerating the baked shader images. Unreachable in
 * production, and never linked from the nav — real pages ship no shader code.
 */
export default function ShaderBakePage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <BakeBoard />;
}

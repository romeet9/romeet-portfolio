"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  MailIcon,
  RotateCcwIcon,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { overviewCards } from "@/content/overview-cards";
import { cn } from "@/lib/utils";

/**
 * The mobile Overview: a Tinder-style card stack. The top card drags left/right
 * and throws off-screen past a threshold, revealing the next; the deck loops.
 * Desktop keeps its 3x3 grid — this is `md:hidden`, a touch interaction.
 *
 * The cards carry no photos: a minimal neutral surface (bg-card, hairline ring)
 * with the copy, per the design call. Same content as the grid, coded by hand.
 */

// Titles and sentences carry no dashes — the middot / colon the rest of the site
// uses. Applied here so the swipe copy matches the grid's.
const asTitle = (s: string) => s.replace(/\s*—\s*/g, " · ");
const asSentence = (s: string) => s.replace(/\s*—\s*/g, ": ");

type SwipeCard = {
  id: string;
  eyebrow: string;
  title: string;
  detail: string;
  href?: string;
  kind?: "about" | "coming-soon";
};

const CARDS: SwipeCard[] = [
  {
    id: "about",
    eyebrow: "AI Product Designer",
    title: "Romeet Chatterjee",
    detail:
      "I turn ideas into interactive, coded prototypes and ship real products to production.",
    kind: "about",
  },
  ...overviewCards.map((c) => ({
    id: c.id,
    eyebrow: c.eyebrow,
    title: c.title,
    detail: c.detail,
    href: c.href,
    kind: c.render === "coming-soon" ? ("coming-soon" as const) : undefined,
  })),
];

/** LinkedIn mark — simple-icons and lucide both dropped it for trademark reasons. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const aboutLinks = [
  { label: "GitHub", href: "https://github.com/romeet9", Icon: SiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/romeet-in", Icon: LinkedInIcon },
  { label: "Résumé", href: "/romeet-chatterjee-resume.pdf", Icon: FileTextIcon },
  { label: "Email", href: "mailto:chatterjeeromeet9@gmail.com", Icon: MailIcon },
];

function CardFace({ card }: { card: SwipeCard }) {
  return (
    <div className="flex size-full flex-col justify-end overflow-hidden rounded-[22px] border bg-card p-6 shadow-xl shadow-black/10 select-none dark:shadow-black/40">
      {card.kind === "coming-soon" && (
        <span className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full border bg-muted/60 px-2.5 py-1 backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
            In progress
          </span>
        </span>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          {card.eyebrow}
        </span>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {asTitle(card.title)}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {asSentence(card.detail)}
        </p>

        {card.kind === "about" ? (
          <div className="mt-3 flex flex-col gap-4">
            <a
              href="mailto:chatterjeeromeet9@gmail.com"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Hire me
              <ArrowRightIcon className="size-4" />
            </a>
            <div className="flex items-center gap-5">
              {aboutLinks.map(({ label, href, Icon }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          card.href && (
            <Link
              href={card.href}
              className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground hover:underline"
            >
              View
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

// One card behind the top of the stack — smaller, dimmer, and untouchable, so
// the deck reads as a pile with the next card waiting under it.
function BackCard({ card, depth }: { card: SwipeCard; depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
        opacity: depth === 1 ? 0.6 : 0.3,
        zIndex: 10 - depth,
      }}
    >
      <CardFace card={card} />
    </div>
  );
}

function TopCard({ card, onThrow }: { card: SwipeCard; onThrow: () => void }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-12, 0, 12]);
  const opacity = useTransform(x, [-320, -140, 0, 140, 320], [0, 1, 1, 1, 0]);

  const settle = () =>
    animate(x, 0, { type: "spring", stiffness: 420, damping: 34 });

  const toss = (dir: 1 | -1) =>
    animate(x, dir * 620, {
      duration: reduced ? 0 : 0.3,
      ease: "easeIn",
      onComplete: onThrow,
    });

  return (
    <motion.div
      className="absolute inset-0 z-20 cursor-grab touch-pan-y active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragSnapToOrigin={false}
      onDragEnd={(_, info) => {
        // Blend distance and fling — a fast flick throws even if it's short.
        const power = info.offset.x + info.velocity.x * 0.2;
        if (power > 130) toss(1);
        else if (power < -130) toss(-1);
        else settle();
      }}
    >
      <CardFace card={card} />
    </motion.div>
  );
}

export function SwipeDeck({ className }: { className?: string }) {
  const [index, setIndex] = React.useState(0);
  const len = CARDS.length;

  const advance = () => setIndex((i) => (i + 1) % len);
  const back = () => setIndex((i) => (i - 1 + len) % len);
  const restart = () => setIndex(0);

  // Top card + the two waiting behind it, back-to-front so the top paints last.
  const stack = [2, 1, 0]
    .map((depth) => ({ depth, card: CARDS[(index + depth) % len] }))
    .filter(({ depth }) => depth < len);

  return (
    <div
      className={cn(
        "flex min-h-[calc(100svh-var(--snap-bottom)-1rem)] flex-col items-center justify-center gap-6 px-2",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full max-w-[21rem]">
        {stack.map(({ depth, card }) =>
          depth === 0 ? (
            // Key on index so each new top card mounts fresh at x=0.
            <TopCard key={index} card={card} onThrow={advance} />
          ) : (
            <BackCard key={`${depth}-${card.id}`} card={card} depth={depth} />
          ),
        )}
      </div>

      {/* Position + controls. Dots show where you are; the buttons are the
          keyboard/no-touch path to the same swipe. */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={back}
          aria-label="Previous card"
          className="flex size-9 items-center justify-center rounded-full border bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightIcon className="size-4 rotate-180" />
        </button>

        <div className="flex items-center gap-1.5">
          {CARDS.map((c, i) => (
            <span
              key={c.id}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i === index ? "bg-foreground" : "bg-foreground/20",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={advance}
          aria-label="Next card"
          className="flex size-9 items-center justify-center rounded-full border bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={restart}
        className={cn(
          "flex items-center gap-1.5 text-xs text-muted-foreground transition-opacity hover:text-foreground",
          index === 0 && "pointer-events-none opacity-0",
        )}
      >
        <RotateCcwIcon className="size-3.5" />
        Start over
      </button>
    </div>
  );
}

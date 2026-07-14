import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MediaCard } from "@/components/media-card";

/**
 * The hero, as the first card of the deck. It carries what the site header used
 * to: the avatar, the name, the availability signal and the Hire me CTA. With
 * the header gone this is also the page's only <h1>.
 *
 * On mobile it's panel one and fills the screen like every other card. On
 * desktop it spans all three columns as a wide banner — a full-height 4:5 hero
 * would push the entire grid below the fold.
 */
export function HeroCard() {
  return (
    <MediaCard
      image={{ src: "/overview/hero.jpg", alt: "Dark violet abstract waves" }}
      priority
      sizes="(min-width: 768px) 100vw, 100vw"
      titleAs="h1"
      eyebrow="AI Product Designer"
      title="Romeet Chatterjee"
      detail="I don't wait for engineering to ship. I turn ideas into interactive, coded prototypes and ship real products to production."
      overlay={
        <>
          <Avatar className="absolute top-5 left-5 z-10 size-11 rounded-xl ring-1 ring-white/20">
            <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
            <AvatarFallback className="rounded-xl bg-white/10 text-white">
              RC
            </AvatarFallback>
          </Avatar>

          {/* The scroll hint, parked on the card rather than fired as a toast —
              a toast leaves, and this has to be there whenever the hero is. Only
              on mobile: the desktop grid is a grid, not a deck, so there's
              nothing to flick through. */}
          <span className="absolute top-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 backdrop-blur-md md:hidden">
            <span className="text-[10px] font-medium tracking-[0.08em] text-white/75 uppercase">
              Scroll
            </span>
            <ChevronDownIcon className="size-3 animate-bounce text-white/75" />
          </span>

          <span className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
              {/* Shortened on a phone so it can't collide with the scroll pill. */}
              Available<span className="hidden sm:inline"> for roles</span>
            </span>
          </span>
        </>
      }
      className="md:col-span-3 md:aspect-auto md:min-h-72"
    >
      <a
        href="mailto:chatterjeeromeet9@gmail.com"
        className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Hire me
        <ArrowRightIcon className="size-4" />
      </a>
    </MediaCard>
  );
}

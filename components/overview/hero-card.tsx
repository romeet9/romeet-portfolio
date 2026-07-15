import { ArrowRightIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MediaCard } from "@/components/media-card";

/**
 * The "about me" card — the first cell of the 3x3 grid, in the same 4:5 poster
 * format as every other card: the dark violet cover, the avatar and availability
 * pill overlaid, name, role, tagline, and the Hire me button.
 *
 * It carries the site's only <h1>, and it's panel one of the mobile deck.
 */
export function HeroCard() {
  return (
    <MediaCard
      cardId="about"
      image={{ src: "/overview/hero.jpg", alt: "Dark violet abstract waves" }}
      priority
      titleAs="h1"
      eyebrow="AI Product Designer"
      title="Romeet Chatterjee"
      detail="I turn ideas into interactive, coded prototypes and ship real products to production."
      overlay={
        <>
          <Avatar className="absolute top-5 left-5 z-10 size-11 rounded-xl ring-1 ring-white/20">
            <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
            <AvatarFallback className="rounded-xl bg-white/10 text-white">
              RC
            </AvatarFallback>
          </Avatar>

          <span className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
              Available for roles
            </span>
          </span>
        </>
      }
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

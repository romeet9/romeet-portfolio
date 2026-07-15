import { FileTextIcon, MailIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { CardCanvas } from "@/components/overview/card-canvas";

/**
 * The hero: kalyp.so's typographic block — bold headline, one-line statement,
 * muted role line, social icons, all in Space Grotesk — framed on a card so it
 * belongs to the deck. Same dark CardCanvas the coming-soon and tools cards use,
 * so the type is white throughout rather than theme-aware.
 *
 * It carries the site's only <h1> and the links the old header held, and it's
 * still panel one of the mobile deck / the banner above the desktop grid. Marked
 * `data-card` so it fills its panel on mobile like every other card.
 */

/** LinkedIn mark — simple-icons and lucide both dropped it for trademark reasons. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const links = [
  { label: "GitHub", href: "https://github.com/romeet9", Icon: SiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/romeet-in", Icon: LinkedInIcon },
  { label: "Résumé", href: "/romeet-chatterjee-resume.pdf", Icon: FileTextIcon },
  { label: "Email", href: "mailto:chatterjeeromeet9@gmail.com", Icon: MailIcon },
];

export function HeroCard() {
  return (
    <div
      data-card
      className="relative flex h-full flex-col justify-center overflow-hidden rounded-[22px] p-7 ring-1 ring-white/10 sm:p-9 md:aspect-auto md:min-h-72"
    >
      <CardCanvas />

      <div className="relative flex flex-col gap-5 font-display">
        <div className="flex flex-col gap-3">
          {/* 36px / 700 / -0.9px, matching kalyp's headline. */}
          <h1 className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.9px] text-white">
            Hey, I&rsquo;m Romeet.
          </h1>

          <p className="max-w-xl text-xl leading-snug text-white/90">
            I turn ideas into products people want to use.
          </p>

          <p className="max-w-md text-[15px] leading-relaxed text-white/55">
            AI Product Designer who designs and builds with AI end to end,
            shipping real products across web, iOS and macOS.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {links.map(({ label, href, Icon }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-white/60 transition-colors hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

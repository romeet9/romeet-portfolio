import { FileTextIcon, MailIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

/** LinkedIn mark — simple-icons and lucide both dropped it for trademark reasons. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * The hero, after kalyp.so: a plain typographic block, not a card. No image, no
 * avatar, no availability pill, no button — a bold headline, a one-line
 * statement, a muted role line, and a row of social icons, all left-aligned in
 * Space Grotesk.
 *
 * It carries what the site header used to (the site's only <h1>, and the links
 * that used to sit in the header), and it's still panel one of the mobile deck —
 * the deck just has no card behind it here.
 */

const links = [
  { label: "GitHub", href: "https://github.com/romeet9", Icon: SiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/romeet-in", Icon: LinkedInIcon },
  { label: "Résumé", href: "/romeet-chatterjee-resume.pdf", Icon: FileTextIcon },
  { label: "Email", href: "mailto:chatterjeeromeet9@gmail.com", Icon: MailIcon },
];

export function HeroCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 font-display md:py-10">
      <div className="flex flex-col gap-3">
        {/* 36px / 700 / -0.9px tracking, matching kalyp's headline. */}
        <h1 className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.9px] text-foreground">
          Hey, I&rsquo;m Romeet.
        </h1>

        <p className="max-w-xl text-xl leading-snug text-foreground">
          I turn ideas into products people want to use.
        </p>

        <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
          AI Product Designer who designs and builds with AI end to end, shipping
          real products across web, iOS and macOS.
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
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

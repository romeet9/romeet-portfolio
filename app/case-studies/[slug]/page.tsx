import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudy, type Act, type ChartKind } from "@/content/case-studies";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyFigure } from "@/components/case-study/case-study-figure";
import { Reveal } from "@/components/case-study/reveal";
import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { FinalDesignShowcase } from "@/components/final-design-showcase";
import { CaseCardAnatomy, CaseIterations } from "@/components/case-list-sections";
import { BrainstormMatrix } from "@/components/brainstorm-matrix";
import { RedesignDiagram } from "@/components/redesign-diagram";
import { UserTestingDiagram } from "@/components/user-testing-diagram";
import { PhoneMockup } from "@/components/phone-mockup";
import { ImpactChart } from "@/components/portfolio-charts";
import { ErrorRateChart, TimeToAnswerChart } from "@/components/case-study-charts";
import { JourneyTimeline } from "@/components/journey-timeline";

import "../case-study.css";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  return {
    title: `${study.name} — Case study — Romeet Chatterjee`,
    description: study.tagline,
  };
}

const CHARTS: Record<ChartKind, () => React.ReactElement> = {
  timeToAnswer: TimeToAnswerChart,
  journeyTimeline: JourneyTimeline,
  errorRate: ErrorRateChart,
  impact: ImpactChart,
};

/** A subtle centred separator between sections (stand-in for the reference's
 *  hand-drawn flower divider). */
function Divider() {
  return (
    <div className="cs-divider" aria-hidden="true">
      <svg width="140" height="14" viewBox="0 0 140 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="7" x2="58" y2="7" stroke="currentColor" strokeOpacity="0.28" />
        <path d="M70 2.5L74.5 7L70 11.5L65.5 7Z" fill="currentColor" fillOpacity="0.55" />
        <line x1="82" y1="7" x2="140" y2="7" stroke="currentColor" strokeOpacity="0.28" />
      </svg>
    </div>
  );
}

/** A small sprout illustration for the footer. */
function Sprout() {
  return (
    <svg
      className="cs-footer-illo"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M36 62C36 48 36 36 36 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M36 36C28 33 24 26 26 18C34 18 36 26 36 36Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M36 32C44 29 48 22 46 14C38 14 36 22 36 32Z"
        fill="currentColor"
        fillOpacity="0.28"
      />
      <circle cx="36" cy="18" r="4" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/** The editorial point block: an h3 lead-in + body paragraph, with the
 *  Lucide icon preserved as a small muted glyph. Illustrations (bento points)
 *  render as framed, zoomable figures with a caption. */
function PointBlock({
  point,
  index,
  label,
}: {
  point: NonNullable<Act["points"]>[number];
  index: number;
  label?: string;
}) {
  return (
    <div className="cs-point">
      <h3>
        <span className="inline-flex items-center gap-2">
          {point.icon && (
            <point.icon
              aria-hidden="true"
              className="size-[15px] text-[color:var(--cs-accent)] opacity-80"
            />
          )}
          {label ? `${label} 0${index + 1} · ` : ""}
        </span>
        {point.title}
      </h3>
      <p>{point.desc}</p>
      {point.illustration && (
        <CaseStudyFigure
          src={point.illustration}
          alt={point.title}
          width={1680}
          height={1120}
          caption={point.title}
        />
      )}
    </div>
  );
}

/** Points rendered as numbered metric cards (spotlightCards), a list
 *  (items), or editorial h3 + p blocks (bento / cards). */
function PointBlocks({ act }: { act: Act }) {
  const points = act.points ?? [];
  if (points.length === 0) return null;

  if (act.pointsAs === "spotlightCards") {
    return (
      <div className="cs-metrics">
        {points.map((pt, i) => (
          <div className="cs-metric" key={pt.title}>
            <span className="cs-metric-num">
              {act.kpiLabel ?? "Point"} 0{i + 1}
            </span>
            <div className="cs-metric-text">
              <span className="cs-metric-title">{pt.title}</span>
              <span className="cs-metric-desc">{pt.desc}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (act.pointsAs === "items") {
    return (
      <ol>
        {points.map((pt) => (
          <li key={pt.title}>
            <strong>{pt.title}.</strong> {pt.desc}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="cs-points">
      {points.map((pt, i) => (
        <PointBlock key={pt.title} point={pt} index={i} />
      ))}
    </div>
  );
}

function ActSection({ act }: { act: Act }) {
  const Charts = act.charts ?? [];

  return (
    <section id={`act-${act.n}`} className="cs-section">
      <Reveal>
        <div className="cs-eyebrow">
          {String(act.n).padStart(2, "0")} — {act.kicker}
        </div>
        <h2>{act.title}</h2>
      </Reveal>

      {act.lead.map((p, i) => (
        <Reveal key={i}>
          <p>{p}</p>
        </Reveal>
      ))}

      {/* Charts — wide charts (e.g. the timeline) stack full-width */}
      {Charts.length > 0 && (
        <Reveal>
          <div className="flex flex-col gap-4 py-2">
            {Charts.map((kind) => {
              const Chart = CHARTS[kind];
              return <Chart key={kind} />;
            })}
          </div>
        </Reveal>
      )}

      {/* Points */}
      <PointBlocks act={act} />

      {/* Before / after showcase */}
      {act.beforeAfter && (
        <Reveal>
          <BeforeAfterShowcase
            before={act.beforeAfter.before}
            after={act.beforeAfter.after}
          />
        </Reveal>
      )}

      {/* Premium final-design showcase */}
      {act.finalImage && (
        <Reveal>
          <FinalDesignShowcase src={act.finalImage.src} alt={act.finalImage.alt} />
        </Reveal>
      )}

      {/* Recreated Case List sections (native shadcn-card UI) */}
      {act.caseListSection === "anatomy" && (
        <Reveal>
          <CaseCardAnatomy />
        </Reveal>
      )}
      {act.caseListSection === "iterations" && (
        <Reveal>
          <CaseIterations />
        </Reveal>
      )}

      {/* Brainstorming matrix */}
      {act.brainstorm && (
        <Reveal>
          <BrainstormMatrix rows={act.brainstorm} />
        </Reveal>
      )}

      {/* Before/after connector diagram */}
      {act.redesign && (
        <Reveal>
          <RedesignDiagram {...act.redesign} />
        </Reveal>
      )}

      {/* User-testing diagram */}
      {act.userTesting && (
        <Reveal>
          <UserTestingDiagram {...act.userTesting} />
        </Reveal>
      )}

      {/* Blank phone mockup */}
      {act.mockup && (
        <Reveal>
          <PhoneMockup label={act.mockup.label} state={act.mockup.state} />
        </Reveal>
      )}
    </section>
  );
}

/** "Read the next case study" teaser — a bordered editorial block. */
function NextStudyTeaser({
  next,
}: {
  next: { kicker: string; name: string; tagline: string; href?: string };
}) {
  const inner = (
    <>
      <div className="cs-eyebrow">{next.kicker}</div>
      <h2 className="!mb-1">
        {next.name}
        {next.href && (
          <span className="cs-subtitle">Read next →</span>
        )}
        {!next.href && <span className="cs-subtitle">Coming soon</span>}
      </h2>
      <p className="!mb-0">{next.tagline}</p>
    </>
  );
  return next.href ? (
    <Link href={next.href} className="cs-next group">
      {inner}
    </Link>
  ) : (
    <div className="cs-next">{inner}</div>
  );
}

export default async function CaseStudyPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { from } = await searchParams;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const back =
    from === "overview"
      ? { href: "/", label: "Overview" }
      : { href: "/case-studies", label: "Case studies" };

  const navItems = [
    { id: "cs-intro", label: "TLDR" },
    ...study.acts.map((a) => ({ id: `act-${a.n}`, label: a.kicker })),
  ];

  const socials = [
    {
      href: "mailto:chatterjeeromeet9@gmail.com",
      label: "Email",
      icon: (
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.94 1.47C0.44 0.81 0.86 0.56 1.52 0.64L13.51 0.72C14.17 0.72 14.5 1.06 14.34 1.72L14 9.79C13.96 10.38 13.59 10.63 12.92 10.54L1.61 10.63C0.86 10.63 0.53 10.21 0.65 9.54L0.94 1.47Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.19 1.39C3.47 3.16 5.55 4.72 7.43 6.05C9.37 4.72 11.45 3.14 13.67 1.31"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/romeet-in/",
      label: "LinkedIn",
      icon: (
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.37 2.74C2.13 2.74 2.74 2.13 2.74 1.37C2.74 0.61 2.13 0 1.37 0C0.61 0 0 0.61 0 1.37C0 2.13 0.61 2.74 1.37 2.74Z" fill="currentColor" />
          <path d="M1.37 4.37L1.33 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M5.66 12L5.61 4.54M5.61 7.2C5.91 4.89 9.94 4.54 10.29 7.37C10.37 8.14 10.33 8.91 10.33 9.43V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "https://github.com/romeet9",
      label: "GitHub",
      icon: (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="cs-study flex flex-1 flex-col">
      <CaseStudyNav items={navItems} />

      <div className="cs-content">
        {/* Back — a floating chip in the gutter on desktop, in-flow on mobile */}
        <Link href={back.href} className="cs-back" aria-label={`Back to ${back.label}`}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L7 10L12 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Title + meta */}
        <Reveal>
          <h1 className="cs-title">{study.name}</h1>
        </Reveal>
        <Reveal>
          <div className="cs-meta">
            <div className="cs-meta-col">
              <span className="cs-meta-label">Role</span>
              <span className="cs-meta-val">{study.role}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-label">Timeline</span>
              <span className="cs-meta-val">{study.year}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-label">Team</span>
              <span className="cs-meta-val">{study.company}</span>
            </div>
          </div>
        </Reveal>

        {/* Cover */}
        <Reveal>
          <div className="cs-cover">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              width={study.cover.w}
              height={study.cover.h}
              priority
              sizes="(min-width: 641px) 600px, 92vw"
            />
          </div>
        </Reveal>

        {/* Intro / TLDR */}
        <section id="cs-intro" className="cs-section">
          <Reveal>
            <blockquote>{study.hmw}</blockquote>
          </Reveal>
          <Reveal>
            <p>{study.tagline}</p>
          </Reveal>
          <Reveal>
            <div className="cs-metrics">
              {study.metrics.map((m, i) => (
                <div className="cs-metric" key={m.label}>
                  <span className="cs-metric-num">0{i + 1}</span>
                  <div className="cs-metric-text">
                    <span className="cs-metric-title">
                      {m.value} {m.label}
                    </span>
                    {m.sub && <span className="cs-metric-desc">{m.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          {study.skills.length > 0 && (
            <Reveal>
              <div className="cs-skills">
                {study.skills.map((s) => (
                  <span key={s} className="cs-skill">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </section>

        <Divider />

        {/* The story */}
        {study.acts.map((act, i) => (
          <Fragment key={act.n}>
            <ActSection act={act} />
            {i < study.acts.length - 1 && <Divider />}
          </Fragment>
        ))}

        {/* Next study */}
        {study.next && <NextStudyTeaser next={study.next} />}

        {/* Footer */}
        <footer className="cs-footer">
          <Sprout />
          <p className="cs-footer-note">Thanks for scrolling till the end :)</p>
          <div className="cs-social">
            {socials.map(({ href, label, icon }) => (
              <a key={label} href={href} aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

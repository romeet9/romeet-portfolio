import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  ClockIcon,
  LightbulbIcon,
  PenToolIcon,
  type LucideIcon,
} from "lucide-react";

import {
  caseStudies,
  getCaseStudy,
  type Act,
  type ChartKind,
} from "@/content/case-studies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { FinalDesignShowcase } from "@/components/final-design-showcase";
import {
  CaseCardAnatomy,
  CaseIterations,
} from "@/components/case-list-sections";
import { BrainstormMatrix } from "@/components/brainstorm-matrix";
import { RedesignDiagram } from "@/components/redesign-diagram";
import { UserTestingDiagram } from "@/components/user-testing-diagram";
import { PhoneMockup } from "@/components/phone-mockup";
import { ImpactChart } from "@/components/portfolio-charts";
import {
  ErrorRateChart,
  TimeToAnswerChart,
} from "@/components/case-study-charts";
import { JourneyTimeline } from "@/components/journey-timeline";
import { CaseStudyNav, CaseStudyBackButton } from "@/components/case-study/case-study-nav";
import { VoteInCaseStudy } from "@/components/case-study/vote-in-case-study";
import { EdgeCrmCaseStudy } from "@/components/case-study/edge-crm-case-study";
import { GpactsCaseStudy } from "@/components/case-study/gpacts-case-study";
import { cn } from "@/lib/utils";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ from?: string }>;
};

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";

/** Card styles matching the clean dark card surfaces of Vote IN. */
const CARD_3D =
  "*:data-[slot=card]:bg-[#18181a] *:data-[slot=card]:border-white/10 *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-[#18181a]";

function GrungeSeparator() {
  return (
    <div className="flex w-full justify-center py-4" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05ZA7AQR379995KJKXBG29X.png"
        alt=""
        className="w-[197px] h-[10px] object-contain opacity-60 select-none pointer-events-none"
      />
    </div>
  );
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  const title = `${study.name} — UX/UI Case Study — Romeet Chatterjee`;
  const description = `${study.tagline} Detailed UX research, cognitive friction analysis, and business outcomes designed by Romeet Chatterjee.`;
  return {
    title,
    description,
    keywords: [
      study.name,
      "Product Design Case Study",
      "UX/UI Case Study",
      "Romeet Chatterjee",
      "Enterprise Product Design",
      "Design Systems",
      "Information Architecture",
      study.role,
      study.company,
      ...study.skills,
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://romeet-portfolio.vercel.app/case-studies/${study.slug}`,
      authors: ["Romeet Chatterjee"],
      images: [
        {
          url: study.cover?.src || "https://romeet-portfolio.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: `${study.name} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@romeetchatterjee",
    },
  };
}

/** A small square icon tile — the accent that gives each card/act identity. */
function IconChip({
  icon: Icon,
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground shadow-xs",
        className,
      )}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </span>
  );
}

const CHARTS: Record<ChartKind, () => React.ReactElement> = {
  timeToAnswer: TimeToAnswerChart,
  journeyTimeline: JourneyTimeline,
  errorRate: ErrorRateChart,
  impact: ImpactChart,
};

/** Charts that read best across the full content width (stack, don't grid). */
const WIDE_CHARTS = new Set<ChartKind>(["journeyTimeline"]);

function ActSection({ act }: { act: Act }) {
  const Charts = act.charts ?? [];

  return (
    <section id={`act-${act.n}`} className="flex scroll-mt-24 flex-col gap-6">
      {/* Act header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {act.step}
        </span>
        <h2
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          style={{ fontFamily: HELVETICA }}
        >
          {act.title}
        </h2>
      </div>

      {/* Narrative + optional phone mockup */}
      <div
        className={cn(
          "grid gap-8",
          act.mockup && "md:grid-cols-[1fr_auto] md:items-start md:gap-12",
        )}
      >
        <div className="flex flex-col gap-5">
          {act.lead.map((p, i) => (
            <p key={i} className="leading-relaxed text-neutral-300" style={{ fontFamily: HELVETICA }}>
              {p}
            </p>
          ))}
        </div>

        {act.mockup && (
          <div className="flex justify-center md:justify-end">
            <PhoneMockup label={act.mockup.label} state={act.mockup.state} />
          </div>
        )}
      </div>

      {/* Before / after showcase on Vote IN Bento background */}
      {act.beforeAfter && (
        <BeforeAfterShowcase
          before={act.beforeAfter.before}
          after={act.beforeAfter.after}
        />
      )}

      {/* Premium final-design showcase on Vote IN Bento background */}
      {act.finalImage && (
        <FinalDesignShowcase src={act.finalImage.src} alt={act.finalImage.alt} />
      )}

      {/* Recreated Case List sections (native shadcn-card UI) */}
      {act.caseListSection === "anatomy" && <CaseCardAnatomy />}
      {act.caseListSection === "iterations" && <CaseIterations />}

      {/* Brainstorming matrix (dedicated act) */}
      {act.brainstorm && <BrainstormMatrix rows={act.brainstorm} />}

      {/* Re-designing before/after connector diagram (dedicated act) */}
      {act.redesign && <RedesignDiagram {...act.redesign} />}

      {/* User-testing mockup + annotations diagram (dedicated act) */}
      {act.userTesting && <UserTestingDiagram {...act.userTesting} />}

      {/* Charts — wide charts (e.g. the timeline) stack full-width */}
      {Charts.length > 0 && (
        <div
          className={cn(
            "grid gap-4",
            Charts.length > 1 &&
              !Charts.some((c) => WIDE_CHARTS.has(c)) &&
              "md:grid-cols-2",
          )}
        >
          {Charts.map((kind) => {
            const Chart = CHARTS[kind];
            return <Chart key={kind} />;
          })}
        </div>
      )}

      {/* Points — item list */}
      {act.points && act.points.length > 0 && act.pointsAs === "items" && (
        <ItemGroup className="gap-2.5">
          {act.points.map((pt) => (
            <Item key={pt.title} variant="outline" className="bg-[#18181a] border-white/10 text-white">
              <ItemMedia variant="icon">
                <pt.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{pt.title}</ItemTitle>
                <ItemDescription className="text-neutral-400">{pt.desc}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      )}

      {/* Points — Vote IN signature Bento container cards, 2x2 */}
      {act.points && act.points.length > 0 && act.pointsAs === "bento" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {act.points.map((pt) => (
            <div
              key={pt.title}
              className="flex flex-col rounded-2xl justify-end gap-1.5 p-1 min-h-[340px] [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]"
            >
              <div
                className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] flex flex-col justify-end p-6"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                {pt.illustration && (
                  <Image
                    src={pt.illustration}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 500px, 90vw"
                    className="object-cover object-center"
                  />
                )}
                {/* bottom fade so the caption stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#18181a] via-[#18181a]/85 to-transparent pointer-events-none" />
                <div className="relative">
                  <h3 className="text-[15px] font-medium tracking-tight text-white">
                    {pt.title}
                  </h3>
                  <p className="mt-1.5 max-w-[92%] text-sm leading-relaxed text-neutral-300">
                    {pt.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Points — same shadcn KPI card design as the outcome metrics at the top */}
      {act.points && act.points.length > 0 && act.pointsAs === "spotlightCards" && (
        <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4", CARD_3D)}>
          {act.points.map((pt, i) => (
            <Card key={pt.title}>
              <CardHeader>
                <CardDescription>{act.kpiLabel ?? "Point"} 0{i + 1}</CardDescription>
                <CardTitle className="text-lg leading-snug font-semibold tracking-tight text-white">
                  {pt.title}
                </CardTitle>
                <CardAction>
                  <IconChip icon={pt.icon} />
                </CardAction>
              </CardHeader>
              <CardFooter className="text-xs text-neutral-400">
                {pt.desc}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Points — card grid */}
      {act.points &&
        act.points.length > 0 &&
        act.pointsAs !== "items" &&
        act.pointsAs !== "bento" &&
        act.pointsAs !== "spotlightCards" && (
          <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", CARD_3D)}>
            {act.points.map((pt) => (
              <Card key={pt.title}>
                <CardHeader>
                  <IconChip icon={pt.icon} />
                  <CardTitle className="mt-2.5 text-sm font-medium text-white">{pt.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {pt.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </section>
  );
}

/** The "How might we" framing question — styled with shadcn KPI card. */
function HmwSection({ hmw }: { hmw: string }) {
  return (
    <section id="cs-hmw" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          The design question
        </span>
        <h2
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          style={{ fontFamily: HELVETICA }}
        >
          How might we?
        </h2>
      </div>
      <div className={CARD_3D}>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Reframing the problem</CardDescription>
            <CardTitle className="text-xl leading-snug font-medium text-white @[420px]/card:text-2xl">
              {hmw}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1.5 border-white/10 text-neutral-300">
                <LightbulbIcon className="size-3.5" />
                HMW
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm text-neutral-400">
            The single question the redesign had to answer.
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

/** "Read the next case study" teaser CTA. */
function NextStudyCard({
  next,
}: {
  next: { kicker: string; name: string; tagline: string; href?: string };
}) {
  const card = (
    <div id="cs-next" className={cn("scroll-mt-24", CARD_3D)}>
      <Card className="@container/card transition-colors group-hover:border-ring/40">
        <CardHeader>
          <CardDescription>{next.kicker}</CardDescription>
          <CardTitle className="text-xl text-white @[420px]/card:text-2xl">{next.name}</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1.5 border-white/10 text-neutral-300">
              {next.href ? (
                <>
                  <ArrowUpRightIcon className="size-3.5" />
                  Read next
                </>
              ) : (
                <>
                  <ClockIcon className="size-3.5" />
                  Coming soon
                </>
              )}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-neutral-400">{next.tagline}</CardFooter>
      </Card>
    </div>
  );
  return next.href ? (
    <Link
      href={next.href}
      className="group block transition-transform hover:-translate-y-0.5"
    >
      {card}
    </Link>
  ) : (
    card
  );
}

export default async function CaseStudyPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://romeet-portfolio.vercel.app/case-studies/${study.slug}#article`,
        "headline": `${study.name}: ${study.tagline}`,
        "description": study.tagline,
        "author": {
          "@type": "Person",
          "name": "Romeet Chatterjee",
          "url": "https://romeet-portfolio.vercel.app"
        },
        "publisher": {
          "@type": "Person",
          "name": "Romeet Chatterjee"
        },
        "mainEntityOfPage": `https://romeet-portfolio.vercel.app/case-studies/${study.slug}`,
        "about": {
          "@type": "SoftwareApplication",
          "name": study.name
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://romeet-portfolio.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Case Studies",
            "item": "https://romeet-portfolio.vercel.app/case-studies"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": study.name,
            "item": `https://romeet-portfolio.vercel.app/case-studies/${study.slug}`
          }
        ]
      }
    ]
  };

  const schemaScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
    />
  );

  if (slug === "vote-in") {
    return (
      <>
        {schemaScript}
        <VoteInCaseStudy />
      </>
    );
  }
  if (slug === "edge-crm") {
    return (
      <>
        {schemaScript}
        <EdgeCrmCaseStudy />
      </>
    );
  }
  if (slug === "gpacts") {
    return (
      <>
        {schemaScript}
        <GpactsCaseStudy />
      </>
    );
  }

  const { from } = (searchParams ? await searchParams : {}) as { from?: string };
  const backHref = from === "overview" ? "/" : "/case-studies";
  const backLabel = from === "overview" ? "Overview" : "All case studies";

  const {
    name,
    tagline,
    year,
    role,
    company,
    skills,
    hmw,
    metrics,
    acts,
    links,
    next,
  } = study;

  // Build navigation items matching Vote IN side navigation
  const navItems = [
    { id: "cs-intro", label: "Overview" },
    ...acts.map((a) => ({
      id: `act-${a.n}`,
      label: a.kicker ?? (a.step ? a.step.replace(/Act \d+\s*·\s*/i, "") : `Act ${a.n}`),
    })),
    ...(hmw ? [{ id: "cs-hmw", label: "How Might We" }] : []),
    ...(next ? [{ id: "cs-next", label: "Next Study" }] : []),
  ];

  return (
    <div
      className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
      }}
    >
      {/* Floating Side Navigation & Back Button matching Vote IN template */}
      <CaseStudyNav items={navItems} />
      <CaseStudyBackButton href={backHref} />

      <article className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        {/* Back Link */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit text-neutral-400 hover:text-white"
            nativeButton={false}
            render={<Link href={backHref} />}
          >
            <ArrowLeftIcon />
            {backLabel}
          </Button>
        </div>

        {/* Header (Overview / Intro) */}
        <header id="cs-intro" className="flex scroll-mt-24 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white">Case study</Badge>
            <Badge variant="outline" className="gap-1.5 border-white/10 text-neutral-300">
              <Building2Icon className="size-3.5" />
              {company}
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-white/10 text-neutral-300">
              <BriefcaseIcon className="size-3.5" />
              {role}
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-white/10 text-neutral-300">
              <CalendarIcon className="size-3.5" />
              {year}
            </Badge>
          </div>
          <h1
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: HELVETICA }}
          >
            {name}
          </h1>
          <p className="text-lg text-neutral-300">{tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="bg-white/10 text-neutral-200 font-normal">
                {s}
              </Badge>
            ))}
          </div>
          {(links?.live || links?.figma) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {links.live && (
                <Button
                  size="sm"
                  nativeButton={false}
                  render={<a href={links.live} target="_blank" rel="noopener noreferrer" />}
                >
                  <ArrowUpRightIcon />
                  View live
                </Button>
              )}
              {links.figma && (
                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={<a href={links.figma} target="_blank" rel="noopener noreferrer" />}
                >
                  <PenToolIcon />
                  Figma file
                </Button>
              )}
            </div>
          )}
        </header>

        {/* Outcome at a glance */}
        <section
          className={cn(
            "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4",
            CARD_3D,
          )}
        >
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardHeader>
                <CardDescription>{m.label}</CardDescription>
                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums text-white">
                  {m.value}
                </CardTitle>
                <CardAction>
                  <IconChip icon={m.icon} />
                </CardAction>
              </CardHeader>
              {m.sub && (
                <CardFooter className="text-xs text-neutral-400">
                  {m.sub}
                </CardFooter>
              )}
            </Card>
          ))}
        </section>

        <GrungeSeparator />

        {/* The Hero's Journey Acts */}
        <div className="flex flex-col gap-16">
          {acts.map((a, i) => (
            <Fragment key={a.n}>
              <ActSection act={a} />
              {a.n === 1 && (
                <>
                  <GrungeSeparator />
                  <HmwSection hmw={hmw} />
                </>
              )}
              {i < acts.length - 1 && <GrungeSeparator />}
            </Fragment>
          ))}
        </div>

        {/* Next case study */}
        {next && (
          <>
            <GrungeSeparator />
            <NextStudyCard next={next} />
          </>
        )}

        {/* Footer CTA */}
        <div className={CARD_3D}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-white">Want a flow like this?</CardTitle>
              <CardDescription>
                I redesign information-heavy B2B products end to end, from research to handoff.
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button
                size="sm"
                nativeButton={false}
                render={<a href="mailto:chatterjeeromeet9@gmail.com" />}
              >
                Work with me
              </Button>
              <Button
                size="sm"
                variant="outline"
                nativeButton={false}
                render={<Link href="/case-studies" />}
              >
                <ArrowLeftIcon />
                All case studies
              </Button>
            </CardFooter>
          </Card>
        </div>
      </article>
    </div>
  );
}

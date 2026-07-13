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
import { IconChip } from "@/components/icon-chip";
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
import { cn } from "@/lib/utils";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

/** The dashboard "3D" card wash — top gradient + soft shadow on every <Card>. */
const CARD_3D =
  "*:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card";

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

/** Charts that read best across the full content width (stack, don't grid). */
const WIDE_CHARTS = new Set<ChartKind>(["journeyTimeline"]);

function ActSection({ act }: { act: Act }) {
  const Charts = act.charts ?? [];

  return (
    <section id={`act-${act.n}`} className="flex scroll-mt-20 flex-col gap-6">
      {/* Act header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {act.step}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
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
            <p key={i} className="leading-relaxed text-muted-foreground">
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

      {/* Before / after showcase */}
      {act.beforeAfter && (
        <BeforeAfterShowcase
          before={act.beforeAfter.before}
          after={act.beforeAfter.after}
        />
      )}

      {/* Premium final-design showcase */}
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
            <Item key={pt.title} variant="outline" className="bg-card">
              <ItemMedia variant="icon">
                <pt.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{pt.title}</ItemTitle>
                <ItemDescription>{pt.desc}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      )}

      {/* Points — dark "spotlight" bento cards (full-bleed illustration + caption), 2x2 */}
      {act.points && act.points.length > 0 && act.pointsAs === "bento" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {act.points.map((pt) => (
            <div
              key={pt.title}
              className="relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl bg-[#0c0c0e] ring-1 ring-white/[0.07]"
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
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent" />
              <div className="relative p-6">
                <h3 className="text-[15px] font-medium tracking-tight text-white">
                  {pt.title}
                </h3>
                <p className="mt-1.5 max-w-[92%] text-sm leading-relaxed text-white/45">
                  {pt.desc}
                </p>
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
                <CardTitle className="text-lg leading-snug font-semibold tracking-tight">
                  {pt.title}
                </CardTitle>
                <CardAction>
                  <IconChip icon={pt.icon} />
                </CardAction>
              </CardHeader>
              <CardFooter className="text-xs text-muted-foreground">
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
                  <CardTitle className="mt-2.5 text-sm">{pt.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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

/** The "How might we" framing question — its own section, styled like a shadcn
 * dashboard-01 KPI "top card" (gradient wash + header/action/footer). */
function HmwSection({ hmw }: { hmw: string }) {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          The design question
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How might we?
        </h2>
      </div>
      <div className={CARD_3D}>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Reframing the problem</CardDescription>
            <CardTitle className="text-xl leading-snug font-medium @[420px]/card:text-2xl">
              {hmw}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1.5">
                <LightbulbIcon className="size-3.5" />
                HMW
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            The single question the redesign had to answer.
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

/** "Read the next case study" teaser CTA. Becomes a link once `href` is set. */
function NextStudyCard({
  next,
}: {
  next: { kicker: string; name: string; tagline: string; href?: string };
}) {
  const card = (
    <div className={CARD_3D}>
      <Card className="@container/card transition-colors group-hover:border-ring/40">
        <CardHeader>
          <CardDescription>{next.kicker}</CardDescription>
          <CardTitle className="text-xl @[420px]/card:text-2xl">{next.name}</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1.5">
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
        <CardFooter className="text-sm text-muted-foreground">{next.tagline}</CardFooter>
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
  const { from } = await searchParams;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Back goes wherever you came from: the cards on the overview link with
  // ?from=overview, everything else (including a cold, shared link) lands you
  // on the case-studies index.
  const back =
    from === "overview"
      ? { href: "/", label: "Overview" }
      : { href: "/case-studies", label: "Case studies" };

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

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 w-fit text-muted-foreground"
        nativeButton={false}
        render={<Link href={back.href} />}
      >
        <ArrowLeftIcon />
        {back.label}
      </Button>

      <article className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Case study</Badge>
            <Badge variant="outline" className="gap-1.5 text-muted-foreground">
              <Building2Icon className="size-3.5" />
              {company}
            </Badge>
            <Badge variant="outline" className="gap-1.5 text-muted-foreground">
              <BriefcaseIcon className="size-3.5" />
              {role}
            </Badge>
            <Badge variant="outline" className="gap-1.5 text-muted-foreground">
              <CalendarIcon className="size-3.5" />
              {year}
            </Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="text-lg text-muted-foreground">{tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-normal">
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
                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums">
                  {m.value}
                </CardTitle>
                <CardAction>
                  <IconChip icon={m.icon} />
                </CardAction>
              </CardHeader>
              {m.sub && (
                <CardFooter className="text-xs text-muted-foreground">
                  {m.sub}
                </CardFooter>
              )}
            </Card>
          ))}
        </section>

        {/* The Hero's Journey */}
        <div className="flex flex-col gap-16">
          {acts.map((a) => (
            <Fragment key={a.n}>
              <ActSection act={a} />
              {a.n === 1 && <HmwSection hmw={hmw} />}
            </Fragment>
          ))}
        </div>

        {/* Next case study */}
        {next && <NextStudyCard next={next} />}

        {/* Footer CTA */}
        <div className={CARD_3D}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Want a flow like this?</CardTitle>
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
                render={<Link href="/projects" />}
              >
                <ArrowLeftIcon />
                All work
              </Button>
            </CardFooter>
          </Card>
        </div>
      </article>
    </div>
  );
}

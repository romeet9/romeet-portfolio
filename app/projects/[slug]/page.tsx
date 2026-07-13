import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, CodeIcon, ExternalLinkIcon } from "lucide-react";

import { getProject, projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  const title = `${project.name} — Romeet Chatterjee`;
  return { title, description: project.tagline };
}

function Showcase({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  const { gallery, category, name, coverIsIcon, cover } = project;

  if (category === "iOS" && gallery?.length) {
    return (
      <div className="rounded-xl border bg-muted/40 p-6 md:p-10">
        <div className="flex gap-5 overflow-x-auto pb-2">
          {gallery.map((src) => (
            <Image
              key={src}
              src={src}
              alt={`${name} screen`}
              width={280}
              height={600}
              className="h-[440px] w-auto shrink-0 rounded-2xl border bg-background object-contain"
            />
          ))}
        </div>
      </div>
    );
  }

  if (cover && !coverIsIcon) {
    return (
      <div className="overflow-hidden rounded-xl border">
        <Image
          src={cover}
          alt={`${name} screenshot`}
          width={1600}
          height={1000}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/7] items-center justify-center gap-6 rounded-xl border bg-muted/40 p-8">
      {coverIsIcon && cover && (
        <Image
          src={cover}
          alt={`${name} app icon`}
          width={180}
          height={180}
          className="size-28 rounded-3xl sm:size-36"
        />
      )}
      <span className="text-5xl font-semibold tracking-tight sm:text-7xl">
        {name}
      </span>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { name, tagline, category, description, highlights, stack, status, year, links } =
    project;

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 w-fit text-muted-foreground"
        nativeButton={false} render={<Link href="/projects" />}
      >
        <ArrowLeftIcon />
        All projects
      </Button>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {status}
            </Badge>
            <span className="text-xs text-muted-foreground">{year}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{tagline}</p>
          <div className="flex flex-wrap gap-2">
            {links.live && (
              <Button
                size="sm"
                nativeButton={false} render={
                  <a href={links.live} target="_blank" rel="noopener noreferrer" />
                }
              >
                <ExternalLinkIcon />
                Visit site
              </Button>
            )}
            {links.github && (
              <Button
                size="sm"
                variant="outline"
                nativeButton={false} render={
                  <a href={links.github} target="_blank" rel="noopener noreferrer" />
                }
              >
                <CodeIcon />
                GitHub
              </Button>
            )}
          </div>
        </div>

        <Showcase project={project} />

        {/* Body */}
        <div className="grid gap-8 md:grid-cols-[1fr_16rem]">
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">
                Overview
              </h2>
              <p className="leading-relaxed">{description}</p>
            </section>
            <section>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">
                What it does
              </h2>
              <ul className="flex flex-col gap-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-foreground/50" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">
                Built with
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">
                Facts
              </h2>
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Platform</dt>
                  <dd>{category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>{status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Year</dt>
                  <dd>{year}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

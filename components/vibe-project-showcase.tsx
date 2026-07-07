import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, CodeIcon, ExternalLinkIcon } from "lucide-react";

import { projects, type Project } from "@/content/projects";
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

function ProjectCard({ project }: { project: Project }) {
  const {
    slug,
    name,
    tagline,
    icon,
    category,
    highlights,
    stack,
    status,
    year,
    links,
    accent,
  } = project;

  return (
    <Card className="flex flex-col gap-0 p-0">
      <CardHeader className="gap-2 border-b px-4 py-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <Image
              src={icon}
              alt={`${name} icon`}
              width={80}
              height={80}
              className="size-9 shrink-0 rounded-[0.6rem] object-contain shadow-sm"
            />
          )}
          <CardTitle className="text-base leading-tight">{name}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-xs text-pretty">
          {tagline}
        </CardDescription>
        <CardAction>
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: `color-mix(in oklab, ${accent} 18%, var(--muted))`,
              color: `color-mix(in oklab, ${accent} 72%, var(--foreground))`,
            }}
          >
            {category}
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-4">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Badge
            variant="outline"
            className="px-1.5 py-0 text-[10px] text-muted-foreground"
          >
            {status}
          </Badge>
          <span className="font-mono">{year}</span>
        </div>

        <ul className="flex flex-col gap-1.5">
          {highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-xs leading-snug">
              <CheckIcon
                className="mt-0.5 size-3.5 shrink-0"
                style={{ color: accent }}
              />
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1">
          {stack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-1.5 py-0 text-[10px] font-normal"
            >
              {tech}
            </Badge>
          ))}
          {stack.length > 4 && (
            <Badge
              variant="secondary"
              className="px-1.5 py-0 text-[10px] font-normal text-muted-foreground"
            >
              +{stack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-2 border-t px-4 py-3">
        {links.live && (
          <Button
            size="sm"
            nativeButton={false}
            render={
              <a href={links.live} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ExternalLinkIcon />
            View live
          </Button>
        )}
        {links.github && (
          <Button
            size="sm"
            variant={links.live ? "outline" : "default"}
            nativeButton={false}
            render={
              <a href={links.github} target="_blank" rel="noopener noreferrer" />
            }
          >
            <CodeIcon />
            GitHub
          </Button>
        )}
        <Button
          size="icon-sm"
          variant={links.live || links.github ? "ghost" : "default"}
          className="ml-auto"
          aria-label={`${name} case detail`}
          nativeButton={false}
          render={<Link href={`/projects/${slug}`} />}
        >
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function VibeProjectShowcase() {
  return (
    <div className="grid items-stretch gap-4 @2xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

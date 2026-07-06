import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Real, shipped products I designed &amp; built</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            nativeButton={false}
            render={<Link href="/projects" />}
          >
            View all
            <ArrowRightIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-0.5">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
          >
            {p.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.icon} alt="" className="size-10 shrink-0 rounded-[10px]" />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border bg-muted text-sm font-medium">
                {p.name.slice(0, 1)}
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-medium">{p.name}</span>
              <span className="truncate text-xs text-muted-foreground">{p.tagline}</span>
            </div>
            <Badge
              variant="outline"
              className="ml-auto hidden shrink-0 text-muted-foreground sm:inline-flex"
            >
              {p.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

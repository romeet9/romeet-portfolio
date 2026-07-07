import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { caseStudies } from "@/content/case-studies";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CaseStudiesGrid({ limit }: { limit?: number }) {
  const rows = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((c) => (
        <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group flex">
          <Card className="h-full w-full gap-4 overflow-hidden pt-0 transition-colors group-hover:bg-muted/30">
            <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted/40">
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                quality={90}
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <CardHeader>
              <CardDescription>
                {c.company} · {c.year}
              </CardDescription>
              <CardTitle className="text-base">{c.name}</CardTitle>
              <CardAction>
                <ArrowUpRightIcon className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="line-clamp-2 text-sm text-muted-foreground">{c.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="font-normal text-muted-foreground"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

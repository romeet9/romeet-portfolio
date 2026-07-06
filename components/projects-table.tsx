import Link from "next/link";
import { CodeIcon, ExternalLinkIcon } from "lucide-react";

import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProjectsTable({ limit }: { limit?: number }) {
  const rows = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Stack</TableHead>
            <TableHead className="hidden lg:table-cell">Year</TableHead>
            <TableHead className="text-right">Links</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.slug}>
              <TableCell className="max-w-[24rem]">
                <div className="flex items-center gap-3">
                  {p.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.icon} alt="" className="size-9 shrink-0" />
                  ) : (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border bg-muted text-xs font-medium">
                      {p.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-medium hover:underline"
                    >
                      {p.name}
                    </Link>
                    <div className="line-clamp-1 text-xs text-muted-foreground">
                      {p.tagline}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{p.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-muted-foreground">
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                {p.stack.slice(0, 3).join(" · ")}
              </TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {p.year}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {p.links.live && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Live site"
                      nativeButton={false}
                      render={
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <ExternalLinkIcon />
                    </Button>
                  )}
                  {p.links.github && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="GitHub"
                      nativeButton={false}
                      render={
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <CodeIcon />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    nativeButton={false}
                    render={<Link href={`/projects/${p.slug}`} />}
                  >
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

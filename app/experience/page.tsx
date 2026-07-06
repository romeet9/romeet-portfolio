import type { Metadata } from "next";

import { jobs, education } from "@/content/experience";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";

export const metadata: Metadata = { title: "Experience — Romeet Chatterjee" };

export default function ExperiencePage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Experience</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Two years designing B2B SaaS from blank canvas to production.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false} render={
            <a
              href="/romeet-chatterjee-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FileTextIcon />
          Full résumé
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <Card key={job.company}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">
                  {job.role}{" "}
                  <span className="text-muted-foreground">· {job.company}</span>
                </CardTitle>
                <Badge variant="outline" className="text-muted-foreground">
                  {job.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{job.context}</p>
              <ul className="flex flex-col gap-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/50" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">
                {education.school}{" "}
                <span className="text-muted-foreground">· {education.degree}</span>
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                {education.period}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

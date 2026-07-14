import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { ProjectsStack } from "@/components/projects-stack";
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
      <CardContent className="flex flex-1 flex-col">
        <ProjectsStack />
      </CardContent>
    </Card>
  );
}

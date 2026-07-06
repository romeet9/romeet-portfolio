import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** The shared annotation card used by the Re-designing, User Testing, and
 * Solutions diagrams — the shadcn dashboard-01 "top card" block pattern:
 * a small label, a title, and a footer note. Identical everywhere. */
export function AnnotationCard({
  label,
  index,
  title,
  desc,
  cardRef,
}: {
  label: string;
  index: number;
  title: string;
  desc: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <Card ref={cardRef} size="sm" className="@container/card">
      <CardHeader>
        <CardDescription>
          {label} 0{index + 1}
        </CardDescription>
        <CardTitle className="text-sm leading-snug @[240px]/card:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground">{desc}</CardFooter>
    </Card>
  );
}

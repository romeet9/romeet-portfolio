import {
  SiFramer,
  SiFigma,
  SiAnthropic,
  SiReddit,
  SiX,
} from "@icons-pack/react-simple-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Real Visual Studio Code mark (simple-icons dropped it for trademark reasons).
function VSCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94c.352.323.883.347 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352ZM18 17.449 10.826 12 18 6.552v10.897Z" />
    </svg>
  );
}

type Tool = {
  name: string;
  role: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const tools: Tool[] = [
  { name: "VS Code", role: "Code editor", Icon: VSCodeIcon },
  { name: "Framer", role: "Prototyping & sites", Icon: SiFramer },
  { name: "Figma", role: "Product design", Icon: SiFigma },
  { name: "Claude Code", role: "AI pair programmer", Icon: SiAnthropic },
  { name: "Reddit", role: "Research & community", Icon: SiReddit },
  { name: "X", role: "Community & launches", Icon: SiX },
];

export function ToolsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tools I use</CardTitle>
        <CardDescription>My day-to-day design &amp; build stack</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5">
        {tools.map(({ name, role, Icon }) => (
          <div
            key={name}
            className="-mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
              <Icon className="size-4" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-medium">{name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {role}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

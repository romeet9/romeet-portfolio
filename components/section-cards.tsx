import { ExperienceCard } from "@/components/experience-card";
import { PrototypesCard } from "@/components/prototypes-card";
import { ShippedCard } from "@/components/shipped-card";
import { ToolsCard } from "@/components/tools-card";

/**
 * The four KPI cards, each implemented from its Paper design (kpi-card-1..4 in
 * "Gentle nebula") with the real @paper-design/shaders-react shaders — dark
 * (prototypes, experience) and light metallic (shipped, tools) — laid out as a
 * uniform box row.
 */
export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <PrototypesCard />
      <ShippedCard />
      <ExperienceCard />
      <ToolsCard />
    </div>
  );
}

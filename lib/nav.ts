import {
  CodeIcon,
  FolderIcon,
  LayoutDashboardIcon,
  Link2Icon,
  MailIcon,
  PencilRulerIcon,
  type LucideIcon,
} from "lucide-react";
// BriefcaseIcon and FileTextIcon are unused while Experience and Résumé are
// commented out below — re-add them to the import when restoring those entries.

export type NavItem = { title: string; url: string; icon: LucideIcon };

// Single source of truth for the primary destinations — the sidebar and the
// floating dock both render from this, so they can never drift apart.
export const navMain: NavItem[] = [
  { title: "Overview", url: "/", icon: LayoutDashboardIcon },
  { title: "Case studies", url: "/case-studies", icon: PencilRulerIcon },
  { title: "Vibe Coded Projects", url: "/projects", icon: FolderIcon },
  // Experience is hidden for now. The /experience route still exists and works;
  // restore this line to put it back in the dock.
  // { title: "Experience", url: "/experience", icon: BriefcaseIcon },
  { title: "Contact", url: "/contact", icon: MailIcon },
];

// External links — these used to live at the bottom of the sidebar.
export const navLinks: NavItem[] = [
  // Résumé hidden for now. The PDF is still served from /public; restore this
  // line to bring the link back.
  // { title: "Résumé", url: "/romeet-chatterjee-resume.pdf", icon: FileTextIcon },
  { title: "GitHub", url: "https://github.com/romeet9", icon: CodeIcon },
  { title: "LinkedIn", url: "https://linkedin.com/in/romeet-in", icon: Link2Icon },
];

export function isNavItemActive(url: string, pathname: string) {
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}

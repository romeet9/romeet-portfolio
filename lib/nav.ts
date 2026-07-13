import {
  BriefcaseIcon,
  CodeIcon,
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  Link2Icon,
  MailIcon,
  PencilRulerIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; url: string; icon: LucideIcon };

// Single source of truth for the primary destinations — the sidebar and the
// floating dock both render from this, so they can never drift apart.
export const navMain: NavItem[] = [
  { title: "Overview", url: "/", icon: LayoutDashboardIcon },
  { title: "Case studies", url: "/case-studies", icon: PencilRulerIcon },
  { title: "Vibe Coded Projects", url: "/projects", icon: FolderIcon },
  { title: "Experience", url: "/experience", icon: BriefcaseIcon },
  { title: "Contact", url: "/contact", icon: MailIcon },
];

// External links — these used to live at the bottom of the sidebar.
export const navLinks: NavItem[] = [
  { title: "Résumé", url: "/romeet-chatterjee-resume.pdf", icon: FileTextIcon },
  { title: "GitHub", url: "https://github.com/romeet9", icon: CodeIcon },
  { title: "LinkedIn", url: "https://linkedin.com/in/romeet-in", icon: Link2Icon },
];

export function isNavItemActive(url: string, pathname: string) {
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}

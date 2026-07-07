import type { Metadata } from "next";
import {
  MailIcon,
  Link2Icon,
  CodeIcon,
  FileTextIcon,
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Contact — Romeet Chatterjee" };

const links = [
  { label: "Email", value: "chatterjeeromeet9@gmail.com", href: "mailto:chatterjeeromeet9@gmail.com", icon: MailIcon },
  { label: "LinkedIn", value: "linkedin.com/in/romeet-in", href: "https://linkedin.com/in/romeet-in", icon: Link2Icon },
  { label: "GitHub", value: "github.com/romeet9", href: "https://github.com/romeet9", icon: CodeIcon },
  { label: "Résumé", value: "Download PDF", href: "/romeet-chatterjee-resume.pdf", icon: FileTextIcon },
];

export default function ContactPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Open to product design roles. Send a note, or reach me directly.
        </p>
      </div>

      <div className="grid gap-4 @2xl/main:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>
              This opens your mail client, pre-filled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Direct</CardTitle>
            <CardDescription>Remote · India</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
              >
                <l.icon className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{l.label}</span>
                  <span className="text-xs text-muted-foreground">{l.value}</span>
                </div>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

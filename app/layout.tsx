import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const SITE = "Romeet Chatterjee — Portfolio Dashboard";
const DESC =
  "Product designer Romeet Chatterjee's portfolio, presented as a product dashboard: projects, metrics and experience across web, iOS and macOS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://romeet.vercel.app"),
  title: SITE,
  description: DESC,
  authors: [{ name: "Romeet Chatterjee" }],
  openGraph: { title: SITE, description: DESC, type: "website" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Romeet Chatterjee",
  jobTitle: "AI Product Designer",
  email: "mailto:chatterjeeromeet9@gmail.com",
  sameAs: ["https://linkedin.com/in/romeet-in", "https://github.com/romeet9"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 68)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

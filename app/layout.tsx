import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomScrim } from "@/components/bottom-scrim";
import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
// The portfolio's single typeface. Wired to --font-sans in globals.css, so the
// whole site renders in Instrument Sans; the KPI cards also name it directly.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const SITE = "Romeet Chatterjee — Portfolio Dashboard";
const DESC =
  "Product designer Romeet Chatterjee's portfolio, presented as a product dashboard: projects, metrics and experience across web, iOS and macOS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://romeet-chatterjee.vercel.app"),
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable}`}
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
          {/* Bottom padding keeps page content clear of the floating dock. */}
          <div className="flex min-h-svh flex-col pb-28">
            <SiteHeader />
            {/* One centred column for every screen — pages own their vertical
                rhythm, this owns the width and the left/right gutters. */}
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 lg:px-6">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
          <BottomScrim />
          <FloatingDock />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, M_PLUS_Code_Latin } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomScrim } from "@/components/bottom-scrim";
import { TopScrim } from "@/components/top-scrim";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";
import { CustomMousePointer } from "@/components/custom-mouse-pointer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const mPlusCodeLatin = M_PLUS_Code_Latin({
  subsets: ["latin"],
  variable: "--font-m-plus-code-latin",
  weight: ["400", "500", "600", "700"],
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
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://romeet-portfolio.vercel.app/#romeet",
      "name": "Romeet Chatterjee",
      "jobTitle": "Product Designer & Design Technologist",
      "url": "https://romeet-portfolio.vercel.app",
      "email": "mailto:chatterjeeromeet9@gmail.com",
      "description": "Product designer specializing in enterprise software, AI product design, conversion-focused design systems, and high-performance interactive interfaces.",
      "sameAs": [
        "https://linkedin.com/in/romeet-in",
        "https://github.com/romeet9",
        "https://www.behance.net/romeetchatterjee"
      ],
      "knowsAbout": [
        "Product Design",
        "UX/UI Design",
        "Design Systems",
        "Information Architecture",
        "Conversion Rate Optimization (CRO)",
        "Enterprise CRM Workflows",
        "Progressive Disclosure",
        "Frontend Engineering",
        "Next.js & React",
        "WebGL & Shaders"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://romeet-portfolio.vercel.app/#website",
      "url": "https://romeet-portfolio.vercel.app",
      "name": "Romeet Chatterjee — Product Design Portfolio",
      "description": "Product design portfolio featuring enterprise CRM redesigns, civic trust platforms, and high-conversion congress architectures.",
      "publisher": {
        "@id": "https://romeet-portfolio.vercel.app/#romeet"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${mPlusCodeLatin.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Preloader />
          <SmoothScroll />
          {/* Bottom padding keeps page content clear of the floating dock. */}
          <div className="flex min-h-svh flex-col pb-28">
            <TopScrim />
            <SiteHeader />
            {/* One centred column for every screen — pages own their vertical
                rhythm, this owns the width and the left/right gutters. */}
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 lg:px-6">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
          <BottomScrim />
          <FloatingDock />
          <CustomMousePointer />
          <Toaster />
        </ThemeProvider>
        {/* First-party visitor analytics — aggregate counts only, no cookies.
            Collects only in production and once Web Analytics is enabled for the
            project in the Vercel dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}

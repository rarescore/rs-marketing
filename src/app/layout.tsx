import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lev & On Law Firm — Personal Injury Counsel",
    template: "%s | Lev & On Law Firm",
  },
  description:
    "Clear, trauma-aware guidance after an accident, with practical next steps and a no-pressure consultation path.",
  applicationName: "Lev & On Law Firm",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lev & On Law Firm — Personal Injury Counsel",
    description: "Clear, trauma-aware guidance after an accident.",
    siteName: "Lev & On Law Firm",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lev & On Law Firm — Personal Injury Counsel",
    description:
      "Clear, trauma-aware guidance after an accident.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ecebe7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f12" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lev & On Law Firm",
  description:
    "California personal injury counsel prepared from the first call.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

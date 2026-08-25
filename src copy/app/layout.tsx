import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onlev.site"),
  title: {
    default: "ONLEV — Client-winning digital systems",
    template: "%s | ONLEV",
  },
  description:
    "Client-winning website systems designed around how local businesses get chosen.",
  applicationName: "ONLEV",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ONLEV — Client-winning digital systems",
    description: "Websites, useful tools, lead capture, qualification, follow-up, and attribution—built as one connected business system.",
    url: "https://onlev.site",
    siteName: "ONLEV",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ONLEV — client-winning digital systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONLEV — Client-winning digital systems",
    description:
      "Websites, useful tools, lead capture, qualification, follow-up, and attribution—built as one connected business system.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/brand/onlev-mark-light.svg",
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
  "@type": "Organization",
  name: "ONLEV",
  url: "https://onlev.site",
  logo: "https://onlev.site/brand/onlev-mark.svg",
  email: "hello@onlev.site",
  description:
    "ONLEV designs complete client-winning digital systems for lead-driven local businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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

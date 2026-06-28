import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laurenjohnson.design";
const siteDescription =
  "Lauren Johnson is a NYC-based Product Designer creating enterprise web and product experiences. She is currently a UX Web Design Intern at Commvault and pursuing an in M.S. Human-Computer Interaction.";
const socialImage = new URL("/og-image.png", siteUrl).toString();

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("lauren-portfolio-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored || preferred;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lauren Johnson",
  description: siteDescription,
  applicationName: "Lauren Johnson",
  authors: [{ name: "Lauren Johnson", url: siteUrl }],
  creator: "Lauren Johnson",
  publisher: "Lauren Johnson",
  keywords: [
    "Lauren Johnson",
    "Product Designer",
    "UX Designer",
    "NYC Product Designer",
    "Human-Computer Interaction",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Lauren Johnson",
    title: "Lauren Johnson",
    description: siteDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Lauren Johnson portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lauren Johnson",
    description: siteDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeToggle />
        <div className="site-frame">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

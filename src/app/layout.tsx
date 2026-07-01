import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Script from "next/script";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pradhumn Mishra | AI Digital Marketer & Trainer",
  description: "I scale brands through AI SEO, GEO, Google/Meta Ads, and Socail Media Marketing. 4+ years of driving revenue and high-quality leads.",
  keywords: ["Pradhumn Mishra", "Digital Marketer", "AI SEO Specialist", "GEO Optimization", "Google Ads Expert", "Meta Ads Consultant", "Growth Marketer Portfolio", "Delhi NCR Marketer"],
  authors: [{ name: "Pradhumn Mishra" }],
  openGraph: {
    title: "Pradhumn Mishra | AI Digital Marketer & Trainer",
    description: "I scale brands through AI SEO, GEO, Google/Meta Ads, and Socail Media Marketing. 4+ years of driving revenue and high-quality leads.",
    type: "website",
    locale: "en_US",
    siteName: "Pradhumn Mishra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pradhumn Mishra | AI Digital Marketer & Trainer",
    description: "I scale brands through AI SEO, GEO, Google/Meta Ads, and Socail Media Marketing. 4+ years of driving revenue and high-quality leads.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QJMNZYYKR5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QJMNZYYKR5');
          `}
        </Script>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html >
  );
}

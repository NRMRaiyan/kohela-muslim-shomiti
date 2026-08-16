import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kohela Muslim Shomitti | কোহেলা মুসলিম সমিতি",
    template: "%s | Kohela Muslim Shomitti",
  },
  description:
    "Official website of Kohela Muslim Shomitti (কোহেলা মুসলিম সমিতি) — news, notices, events, committee, and history of our community.",
  openGraph: {
    title: "Kohela Muslim Shomitti | কোহেলা মুসলিম সমিতি",
    description:
      "Official website of Kohela Muslim Shomitti — news, notices, events, committee, and history of our community.",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} ${notoSansBengali.variable} ${notoSerifBengali.variable} h-full antialiased`}
      style={
        {
          "--font-display": "var(--font-fraunces)",
          "--font-body": "var(--font-source-sans)",
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Navbar societyNameEn={settings.societyNameEn} societyNameBn={settings.societyNameBn!} />
          <main className="flex-1">{children}</main>
          <Footer
            settings={{
              societyNameEn: settings.societyNameEn,
              societyNameBn: settings.societyNameBn!,
              address: settings.address,
              phone: settings.phone,
              email: settings.email,
              facebookUrl: settings.facebookUrl,
              instagramUrl: settings.instagramUrl,
              youtubeUrl: settings.youtubeUrl,
              whatsappUrl: settings.whatsappUrl,
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}

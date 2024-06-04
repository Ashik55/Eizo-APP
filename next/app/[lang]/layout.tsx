import "./globals.css";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { Locale, i18n } from "@/i18n.config";
import { headers } from "next/headers";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Eizo: AI photo generator",
  description: "Generate awesome AI photo in minutes using AI",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");

  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <div className="relative">
            <section className="sticky top-0 z-20 bg-stone-50">
              {pathname?.includes("login") ? null : (
                <Suspense
                  fallback={
                    <div className="flex h-[69px] w-full items-center justify-between gap-8 border-b px-4 py-4 text-center lg:px-40" />
                  }
                ></Suspense>
              )}
            </section>
            <main className="flex flex-1 flex-col items-center bg-stone-50">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

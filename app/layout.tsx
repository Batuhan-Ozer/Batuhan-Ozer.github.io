import "./globals.css";
import Navbar from "@/components/sidebar";
import { LanguageProvider } from "@/components/language-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "BatuhanOzer Portfolio",
  description: "Developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 px-4 py-6 pt-28 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
import "./globals.css";
import Navbar from "@/components/sidebar";
import { LanguageProvider } from "@/components/language-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Global Metadata Ayarları (Tüm sayfalarda geçerli olan varsayılan ayarlar)
export const metadata = {
  title: "Batuhan Özer Portfolio",
  description: "Software Developer & Web Designer Portfolio",
  icons: {
    icon: "/images/miyabi.png",
    shortcut: "/images/miyabi.png",
    apple: "/images/miyabi.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: Dil sağlayıcısı veya temalardan kaynaklanan 
    // "Hydration" hatalarını engellemek için eklendi.
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {/* pt-28: Navbar'ın altında kalmaması için verilen padding */}
            <main className="flex-1 px-4 py-6 pt-28 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
"use client";

import { useLanguage } from "@/components/language-provider";

export default function ContactPage() {
  const { language } = useLanguage();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        {language === "tr" ? "İletişim" : "Contact"}
      </h1>

      <div className="rounded-2xl border border-[#1a222c] p-6 space-y-4">
        <p className="text-zinc-300 text-lg">
          {language === "tr"
            ? "Benimle iletişime geçmek için aşağıdaki bağlantıları kullanabilirsin."
            : "You can use the links below to get in touch with me."}
        </p>

        <div className="space-y-3 text-zinc-400">
          <p>
            <span className="text-white font-medium">
              {language === "tr" ? "E-posta:" : "Email:"}
            </span>{" "}
            <a
              href="mailto:mertbatuu95@gmail.com"
              className="hover:text-white underline underline-offset-4"
            >
              mertbatuu95@gmail.com
            </a>
          </p>

          <p>
            <span className="text-white font-medium">GitHub:</span>{" "}
            <a
              href="https://github.com/Batuhan-Ozer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline underline-offset-4"
            >
              github.com/Batuhan-Ozer
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

type AboutData = {
  id: number;
  imageUrl: string | null;
  descriptionTr: string;
  descriptionEn: string;
  updatedAt: string;
} | null;

export default function AboutClient({ about }: { about: AboutData }) {
  const { language } = useLanguage();
  const t = translations[language];

  const aboutText = language === "tr"
    ? about?.descriptionTr ?? t.about.descriptionTr
    : about?.descriptionEn ?? t.about.description;

  const highlightKeywords = (text: string) => {
    const keywords =
      language === "tr"
        ? [
            "HTML/CSS",
            "C#",
            "arduino",
            "Vibe coding",
            "Unity Game Engine",
            "VR/XR projeleri",
          ]
        : [
            "HTML/CSS",
            "C#",
            "Arduino",
            "Vibe coding",
            "Unity Game Engine",
            "VR/XR projects",
          ];

    const escaped = keywords.map((keyword) =>
      keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
    );
    const regex = new RegExp(`(${escaped.join("|")})`, "g");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      keywords.includes(part) ? (
        <span key={index} className="text-red-500 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        {language === "tr" ? "Hakkımda" : "About Me"}
      </h1>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
        {about?.imageUrl && (
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.imageUrl}
              alt={language === "tr" ? "Profil" : "Profile"}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border border-[#1a222c] shrink-0"
            />
          </div>
        )}

        <article className="w-full rounded-3xl border border-[#1a222c] bg-white/5 p-6 text-lg leading-8 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:p-8">
          <p className="space-y-4 text-zinc-100">
            {highlightKeywords(aboutText)}
          </p>
        </article>
      </div>
    </main>
  );
}
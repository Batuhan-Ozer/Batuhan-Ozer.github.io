"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";
import Image from "next/image";

type ProjectItem = {
  id: number;
  type: string;
  titleTr: string;
  titleEn: string;
  subjectTr: string;
  subjectEn: string;
  slug: string;
  descriptionTr: string;
  descriptionEn: string;
  date: string;
  githubUrl: string | null;
  images: { id: number; url: string; projectId: number }[];
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsClient({ items }: { items: ProjectItem[] }) {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = items.filter((item) => item.type === "project");
  const competitions = items.filter((item) => item.type === "competition");
  const [activeSlide, setActiveSlide] = useState(0);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const competitionSlides = useMemo(
    () => [
      {
        id: "xr-akademi-basari",
        title:
          language === "tr"
            ? "XR Akademi Başarı Belgesi"
            : "XR Academy Achievement",
        subject:
          language === "tr"
            ? "XR Gezgini Takımı - Türkiye 2.liği"
            : "XR Traveler Team - Turkey 2nd Place",
        image: "/images/xr-akademi-basari.png",
        date: "05.12.2025",
        description:
          language === "tr"
            ? "XR Academy 2025’teki başarı fotoğrafı ve ödül kartı."
            : "XR Academy 2025 achievement photo and award card.",
      },
      {
        id: "xr-reality-logo",
        title: language === "tr" ? "XR Reality" : "XR Reality",
        subject: language === "tr" ? "XR Reality Logo" : "XR Reality Logo",
        image: "/images/xr-reality-logo.png",
        date: "",
        description: "",
      },
    ],
    [language]
  );

  useEffect(() => {
    if (competitionSlides.length === 0) {
      return;
    }

    slideTimer.current = setInterval(() => {
      setActiveSlide((current) => (current + 1) % competitionSlides.length);
    }, 4200);

    return () => {
      if (slideTimer.current) {
        clearInterval(slideTimer.current);
      }
    };
  }, [competitionSlides.length]);

  const renderCards = (list: ProjectItem[]) => {
    if (list.length === 0) {
      return null;
    }

    return (
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/projects/${item.slug}`}
            className="group rounded-2xl border border-[#1a222c] overflow-hidden transition md:hover:-translate-y-1 md:hover:bg-[#0b0f14]"
          >
            <div className="aspect-video bg-zinc-900">
              {item.images[0]?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.images[0].url}
                  alt={language === "tr" ? item.titleTr : item.titleEn}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm sm:text-base">
                  {language === "tr" ? "Görsel Yok" : "No Image"}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                {new Date(item.date).toLocaleDateString(
                  language === "tr" ? "tr-TR" : "en-US"
                )}
              </p>

              <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-snug break-words">
                {language === "tr" ? item.titleTr : item.titleEn}
              </h2>

              <p className="text-sm text-gray-500 mb-3 break-words">
                {language === "tr" ? item.subjectTr : item.subjectEn}
              </p>

              <p className="text-sm sm:text-base line-clamp-3 text-zinc-300 leading-relaxed">
                {language === "tr" ? item.descriptionTr : item.descriptionEn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-10">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          {t.projects.pageTitle}
        </h1>
      </header>

      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          {t.projects.projectsTitle}
        </h2>
        {projects.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500">
            {t.projects.emptyMessage}
          </p>
        ) : (
          renderCards(projects)
        )}
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          {language === "tr" ? "Yarışmalar" : "Competitions"}
        </h2>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090a0d]">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              width: `${competitionSlides.length * 100}%`,
              transform: `translateX(-${activeSlide * (100 / competitionSlides.length)}%)`,
            }}
          >
            {competitionSlides.map((slide) => (
              <div key={slide.id} className="min-w-full p-4 sm:p-6">
                <div className="overflow-hidden rounded-[28px] bg-zinc-950 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.7)]">
                  <div className="relative w-full aspect-video min-h-[240px] overflow-hidden rounded-t-xl">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                    {slide.subject}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{slide.date}</p>
                  <p className="text-sm leading-relaxed text-zinc-300 line-clamp-3">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {competitionSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeSlide ? "bg-red-500" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
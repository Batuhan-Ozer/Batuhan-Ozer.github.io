"use client";

import Link from "next/link";
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
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="group rounded-2xl border border-[#1a222c] overflow-hidden transition md:hover:-translate-y-1 md:hover:bg-[#0b0f14]">
            <div className="aspect-video bg-zinc-900">
              <Image
                src="/images/xr-reality-logo.png"
                alt="XR Reality Logo"
                width={150}
                height={150}
                className="w-full h-full object-contain filter invert"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                05.12.2025
              </p>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-snug break-words">
                {t.projects.cardTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-3 break-words">
                {t.projects.categoryLabel}
              </p>
              <p className="text-sm sm:text-base line-clamp-3 text-zinc-300 leading-relaxed">
                {t.projects.cardDescription}
              </p>
            </div>
          </div>
          {renderCards(competitions)}
        </div>
      </section>
    </main>
  );
}
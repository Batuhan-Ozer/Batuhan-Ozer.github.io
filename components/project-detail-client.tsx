"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

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
  createdAt: string;
  updatedAt: string;
  images: {
    id: number;
    url: string;
    projectId: number;
  }[];
};

export default function ProjectDetailClient({
  project,
}: {
  project: ProjectItem;
}) {
  const { language } = useLanguage();

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-10">
      <Link
        href="/projects"
        className="inline-flex rounded-xl border border-[#1a222c] px-4 py-2 mb-6 sm:mb-8 text-sm sm:text-base hover:bg-[#0b0f14] transition"
      >
        {language === "tr" ? "← Projelere Geri Dön" : "← Back to Projects"}
      </Link>

      <p className="text-xs sm:text-sm text-gray-500 mb-3">
        {new Date(project.date).toLocaleDateString(
          language === "tr" ? "tr-TR" : "en-US"
        )}
      </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight break-words">
          {language === "tr" ? project.titleTr : project.titleEn}
        </h1>

        <span className="w-fit text-xs sm:text-sm rounded-full border border-[#1a222c] px-3 py-1">
          {project.type === "project"
            ? language === "tr"
              ? "Proje"
              : "Project"
            : language === "tr"
            ? "Yarışma"
            : "Competition"}
        </span>
      </div>

      <p className="text-base sm:text-lg text-gray-500 mb-5 sm:mb-6 leading-relaxed break-words">
        {language === "tr" ? project.subjectTr : project.subjectEn}
      </p>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-xl border border-[#1a222c] px-4 py-2 mb-6 sm:mb-8 text-sm sm:text-base hover:bg-[#0b0f14] transition break-all"
        >
          {language === "tr" ? "GitHub'da Gör" : "View on GitHub"}
        </a>
      )}

      {project.images.length > 0 && (
        <div className="grid gap-4 mb-6 sm:mb-8">
          {project.images.map((image) => (
            <div
              key={image.id}
              className="rounded-2xl overflow-hidden border border-[#1a222c]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={language === "tr" ? project.titleTr : project.titleEn}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <article className="text-sm sm:text-base leading-7 sm:leading-8 whitespace-pre-line text-zinc-300">
        {language === "tr" ? project.descriptionTr : project.descriptionEn}
      </article>
    </main>
  );
}
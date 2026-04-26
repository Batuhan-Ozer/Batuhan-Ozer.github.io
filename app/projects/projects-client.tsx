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
  images: { id: number; url: string; projectId: number }[];
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsClient({ items }: { items: ProjectItem[] }) {
  const { language } = useLanguage();

  const projects = items.filter((item) => item.type === "project");
  const competitions = items.filter((item) => item.type === "competition");

  const renderCards = (list: ProjectItem[]) => {
    

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/projects/${item.slug}`}
            className="rounded-2xl border overflow-hidden transition hover:-translate-y-1"
          >
            <div className="aspect-video bg-gray-100">
              {item.images[0]?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.images[0].url}
                  alt={language === "tr" ? item.titleTr : item.titleEn}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.date).toLocaleDateString(
                  language === "tr" ? "tr-TR" : "en-US"
                )}
              </p>
              <h2 className="text-xl font-semibold mb-2">
                {language === "tr" ? item.titleTr : item.titleEn}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {language === "tr" ? item.subjectTr : item.subjectEn}
              </p>
              <p className="line-clamp-3">
                {language === "tr" ? item.descriptionTr : item.descriptionEn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">
          {language === "tr" ? "Projeler ve Yarışmalar" : "Projects and Competitions"}
        </h1>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {language === "tr" ? "Projeler" : "Projects"}
        </h2>
        {renderCards(projects)}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {language === "tr" ? "Yarışmalar" : "Competitions"}
        </h2>
        {renderCards(competitions)}
      </section>
    </main>
  );
}
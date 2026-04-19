"use client";

import Link from "next/link";
import Image from "next/image"; // Next.js Image bileşeni eklendi
import { useLanguage } from "@/components/language-provider";
import { useEffect, useRef, useState } from "react";

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const projects = items.filter((item) => item.type === "project");
  const competitions = items.filter((item) => item.type === "competition");
  const competitionItem = competitions.length > 0 ? competitions[0] : null;

  useEffect(() => {
    imageTimer.current = setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % 2);
    }, 3000);

    return () => {
      if (imageTimer.current) clearInterval(imageTimer.current);
    };
  }, []);

  const renderCards = (list: ProjectItem[]) => {
    if (list.length === 0) {
      return (
        <p className="text-gray-500">
          {language === "tr" ? "Henüz içerik eklenmedi." : "No content has been added yet."}
        </p>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/projects/${item.slug}`}
            className="rounded-2xl border border-gray-800 bg-black overflow-hidden transition hover:-translate-y-1"
          >
            {/* Görsel Alanı: relative eklendi ve bg-gray-100 yerine dark mode uyumlu renk kondu */}
            <div className="relative w-full aspect-video bg-gray-900 border-b border-gray-800">
              {item.images && item.images.length > 0 ? (
                <Image
                  src={item.images[0].url}
                  alt={language === "tr" ? item.titleTr : item.titleEn}
                  fill
                  className="object-cover"
                />
              ) : (
                /* EĞER VERİTABANINA RESİM EKLENMEMİŞSE DİREKT KLASÖRDEKİNİ GÖSTERECEK YEDEK YAPI */
                <Image
                  src="/images/xr-akademi-basari.png" 
                  alt="XR Academy Başarı Belgesi"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
                {new Date(item.date).toLocaleDateString(
                  language === "tr" ? "tr-TR" : "en-US"
                )}
              </p>
              <h2 className="text-xl font-bold mb-2 text-white">
                {language === "tr" ? item.titleTr : item.titleEn}
              </h2>
              <p className="text-sm text-gray-400 mb-3">
                {language === "tr" ? item.subjectTr : item.subjectEn}
              </p>
              <p className="line-clamp-3 text-sm text-gray-500">
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
        <h1 className="text-3xl font-bold text-white">
          {language === "tr" ? "Projeler ve Yarışmalar" : "Projects and Competitions"}
        </h1>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-800 pb-2">
          {language === "tr" ? "Projeler" : "Projects"}
        </h2>
        {renderCards(projects)}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-800 pb-2">
          {language === "tr" ? "Yarışmalar" : "Competitions"}
        </h2>

        {!competitionItem ? (
          <p className="text-gray-500">
            {language === "tr" ? "Henüz içerik eklenmedi." : "No content has been added yet."}
          </p>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#090a0d]">
            <div className="p-4 sm:p-6">
              <div className="overflow-hidden rounded-[28px] bg-zinc-950 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.7)]">
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src="/images/xr-reality-logo.png"
                    alt="XR Reality Logo"
                    fill
                    className={`object-cover transition-opacity duration-700 ${
                      activeImageIndex === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/images/xr-akademi-basari.png"
                    alt="XR Akademi Başarı"
                    fill
                    className={`object-cover transition-opacity duration-700 ${
                      activeImageIndex === 1 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
              <div className="mt-5 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                  {language === "tr" ? competitionItem.subjectTr : competitionItem.subjectEn}
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
                  {language === "tr" ? competitionItem.titleTr : competitionItem.titleEn}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(competitionItem.date).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US"
                  )}
                </p>
                <p className="text-sm leading-relaxed text-zinc-300 line-clamp-3">
                  {language === "tr" ? competitionItem.descriptionTr : competitionItem.descriptionEn}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
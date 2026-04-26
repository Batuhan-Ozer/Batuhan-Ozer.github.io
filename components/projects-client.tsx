"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";
import Image from "next/image";
import { useState } from "react"; // Pop-up için useState eklendi

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
  
  // Pop-up'ın açık/kapalı durumunu tutan state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProject1ModalOpen, setIsProject1ModalOpen] = useState(false);
  const [isProject2ModalOpen, setIsProject2ModalOpen] = useState(false);

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

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 mb-6">
          {/* 1. Proje Kartı: Özer Hotel */}
          <div 
            className="group rounded-2xl border border-[#1a222c] overflow-hidden transition md:hover:-translate-y-1 md:hover:bg-[#0b0f14] cursor-pointer"
            onClick={() => setIsProject1ModalOpen(true)}
          >
            <div className="aspect-video bg-zinc-900 relative">
              <Image
                src="/images/ozerHotel.jpeg"
                alt="Özer Hotel"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-bold text-sm px-4 text-center">
                  {t.projects.ozerHotelHover}
                </p>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">May 2025</p>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-snug break-words">
                {t.projects.ozerHotelTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-3 break-words">
                {t.projects.ozerHotelCategory}
              </p>
              <p className="text-sm sm:text-base line-clamp-3 text-zinc-300 leading-relaxed">
                {t.projects.ozerHotelShortDesc}
              </p>
            </div>
          </div>

          {/* 2. Proje Kartı: Star Chasers */}
          <div 
            className="group rounded-2xl border border-[#1a222c] overflow-hidden transition md:hover:-translate-y-1 md:hover:bg-[#0b0f14] cursor-pointer"
            onClick={() => setIsProject2ModalOpen(true)}
          >
            <div className="aspect-video bg-zinc-900 relative">
              <Image
                src="/images/starChasers.jpg"
                alt="Star Chasers"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-bold text-sm px-4 text-center">
                  {t.projects.project2Hover}
                </p>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Dec 2025</p>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-snug break-words">
                {t.projects.project2Title}
              </h2>
              <p className="text-sm text-gray-500 mb-3 break-words">
                {t.projects.project2Category}
              </p>
              <p className="text-sm sm:text-base line-clamp-3 text-zinc-300 leading-relaxed">
                {t.projects.project2ShortDesc}
              </p>
            </div>
          </div>
        </div>

        

        {/* ÖZER HOTEL PROJESİ POP-UP (MODAL) EKRANI */}
        {isProject1ModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsProject1ModalOpen(false)}
          >
            <div
              className="relative max-w-4xl w-full h-auto min-h-[50vh] rounded-3xl overflow-hidden bg-[#0b0f14] border border-[#1a222c] flex flex-col items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">
                {t.projects.ozerHotelTitle}
              </h2>
              <p className="text-sm md:text-lg text-zinc-300 text-center max-w-3xl leading-relaxed">
                {t.projects.ozerHotelDesc}
              </p>
              <Link
                href="https://github.com/Batuhan-Ozer/Otel_Otomasyonu"
                target="_blank"
                className="mt-8 rounded-2xl border border-[#1a222c] bg-zinc-900 px-6 py-3 text-base md:text-lg font-medium text-white hover:bg-zinc-800 transition"
              >
                {language === "tr" ? "GitHub'da İncele" : "View on GitHub"}
              </Link>
            </div>
          </div>
        )}

        {/* PROJE 2 POP-UP (MODAL) EKRANI */}
        {isProject2ModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsProject2ModalOpen(false)}
          >
            <div
              className="relative max-w-4xl w-full h-auto min-h-[50vh] rounded-3xl overflow-hidden bg-[#0b0f14] border border-[#1a222c] flex flex-col items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">
                {t.projects.project2Title}
              </h2>
              <p className="text-sm md:text-lg text-zinc-300 text-center max-w-3xl leading-relaxed">
                {t.projects.project2Desc}
              </p>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          {language === "tr" ? "Yarışmalar" : "Competitions"}
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          
          {/* İŞTE SENİN DÜZENLEYECEĞİN TIKLANABİLİR KART BURASI */}
          <div 
            className="group rounded-2xl border border-[#1a222c] overflow-hidden transition md:hover:-translate-y-1 md:hover:bg-[#0b0f14] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {/* relative class'ı eklendi ki hover yazısı tam üstüne otursun */}
            <div className="aspect-video bg-zinc-900 relative">
              <Image
                src="/images/xr-reality-logo.png"
                alt="XR Reality Logo"
                width={150}
                height={150}
                className="w-full h-full object-contain filter invert"
              />
              
              {/* HOVER EFEKTİ VE YAZISI */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-bold text-sm px-4 text-center">
                  {language === "tr"
                    ? "Yarışma ile ilgili paylaşımımızın yazısını ve fotoğrafını görmek için tıklayınız."
                    : "Click to view our post text and photo about the competition."}
                </p>
              </div>
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

        {/* POP-UP (MODAL) EKRANI */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full h-[75vh] rounded-3xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/xr-akademi-basari.png"
                alt="Pop-up Görseli"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6">
              <p className="text-white font-bold text-2xl md:text-4xl text-center z-10 drop-shadow-lg">
                {language === "tr" ? "XR Akademi 2025 Türkiye 2.liği!" : "XR Academy 2025 2nd Place in Turkey!"}
              </p>
            </div>
          </div>
        </div>
      )}
      </section>
    </main>
  );
}

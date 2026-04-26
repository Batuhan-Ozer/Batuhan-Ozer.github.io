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
                <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-3xl bg-black/70 border border-white/10 p-6 text-sm sm:text-base leading-7 text-white shadow-xl">
                  {language === "tr" ? (
                    <>
                      <p>“StarChasers” Ekibine XR Akademi Hackathon’undan İkincilik Ödülü! 🚀🪐</p>
                      <p className="mt-4">🎓 Proje danışmanlığını yürüttüğüm “StarChasers” ekibi, “XR Akademi: Eğitimde Dijital Dönüşüm ve KarmaGerçeklik Teknolojileriyle OyunTasarımı” programı kapsamında, 5 Aralık’ta DotsHub’da düzenlenen hackathon’da ikincilik ödülüne layık görüldü.</p>
                      <p className="mt-4">⏰ Yaklaşık bir ay süren yoğun çalışma süreci, proje toplantıları ve tasarım oturumlarının ardından ekibim, birbirinden değerli 14 takımın yarıştığı bu süreçten gurur verici bir başarıyla döndü 🏆</p>
                      <p className="mt-4">🌍 Star Chasers ekibi, MetaQuest üzerinde Unity oyun motorunu kullanarak, XR passthrough tabanlı, uzay temalı ve sürdürülebilirlik odaklı bir öğrenme deneyimi tasarladı.</p>
                      <p className="mt-4">🎮🥽 Ödülün Meta yöneticisi Aanchal Mehta tarafından takdim edilmesi ise ekibimizin elde ettiği bu başarıya ayrı bir anlam kattı 🌟</p>
                      <p className="mt-4">🏛️ Değerli paydaşlarımız ETKİM MEB, Koç Üniversitesi KARMA XR Lab, Habitat Derneği, ArkHaus Community, Meta for Developers ve Games for Change Türkiye iş birliğine;</p>
                      <p className="mt-4">👩‍⚖️ Jüri üyeleri Bilgehan Ozbaylanli, Naz Degirmenci, Burcin Gurbuz, Oytun Kal ve Cemre Gökpınar'a ve</p>
                      <p className="mt-4">💙 Sürece değerli katkılarıyla eşlik eden mentorumuz İpek Kuran'a gönülden teşekkürler! Mehmet Aslan Uğurlu</p>
                      <p className="mt-4">👨‍🚀 XR yolculuğunuz daim olsun StarChasers!</p>
                      <p className="mt-4">🧑‍💻 🥽👩‍💻 başarı ve güzelheyecan teşekkürler! Asim Evren Yantac</p>
                    </>
                  ) : (
                    <>
                      <p>Second Prize for the “Star Chasers” Team at the XR Academy Hackathon! 🚀🪐</p>
                      <p className="mt-4">🎓 The “StarChasers” team, for which I served as project advisor, was awarded second prize at the hackathon held on 5 December at DotsHub, within the scope of the “XR Academy: Game Design in Education with Digital Transformation and Mixed Reality Technologies” program.</p>
                      <p className="mt-4">⏰ After nearly a month of intensive work, project meetings and design sessions, my team returned from this journey – where 14 strong teams competed – with a success we are truly proud of 🏆</p>
                      <p className="mt-4">🌍 The Star Chasers team designed a space-themed and sustainability-focused learning experience using the Unity game engine on MetaQuest, built on XR passthrough.</p>
                      <p className="mt-4">🎮🥽 Having the award presented by Meta manager Aanchal Mehta added an extra layer of meaning to this achievement 🌟</p>
                      <p className="mt-4">🏛️ My sincere thanks go to our valued partners ETKİM MEB, Koç University KARMA XR Lab, Habitat Association, ArkHaus Community, Meta for Developers and Games for Change Türkiye for their collaboration;</p>
                      <p className="mt-4">👩‍⚖️ and to the jury members Bilgehan Ozbaylanli, Naz Degirmenci, Burcin Gurbuz, Oytun Kal and Cemre Gökpınar for their time and insightful evaluations.</p>
                      <p className="mt-4">💙 I would also like to extend my heartfelt thanks to our mentor İpek Kuran, who accompanied us throughout the process with her valuable contributions.</p>
                      <p className="mt-4">👨‍🚀 May your XR journey continue, Star Chasers!</p>
                      <p className="mt-4">🧑‍💻🥽👩‍💻 Thank you for the success and the exciting moments you made us experience. 🙌</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
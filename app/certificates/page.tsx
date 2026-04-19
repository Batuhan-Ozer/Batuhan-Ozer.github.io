"use client";

import { useState } from "react";
import Image from "next/image";

const certificates = [
  {
    title: "XR Akademi Katılım Belgesi",
    image: "/images/xr-akademi.png",
    description:
      "XR Akademi 2025 tecrübemi belgeleyen katılım sertifikası. Görselim burada gösteriliyor.",
  },
  {
    title: "Android 101",
    image: "/images/android-101.png",
    description: "Turkcell Akademi - Geleceği Yazanlar programından Android 101 sertifikası.",
  },
  {
    title: "C# ile Algoritma ve Programlama 101",
    image: "/images/csharp-101.png",
    description: "Turkcell Akademi - Geleceği Yazanlar programından C# algoritma sertifikası.",
  },
  {
    title: "101: HTML",
    image: "/images/html-101.png",
    description: "Turkcell Akademi - Geleceği Yazanlar programından HTML 101 başarı belgesi.",
  },
];

export default function CertificatesPage() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 md:px-10 lg:px-14">
      <div className="mb-10 sm:mb-14">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 mb-3">
          Sertifikalar
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Sertifika Koleksiyonum
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400 leading-relaxed">
          Aşağıdaki sertifika başlıklarına tıklayarak ilgili başarı belgesinin fotoğrafını görebilirsiniz.
        </p>
      </div>

      <div className="space-y-4">
        {certificates.map((certificate, index) => {
          const isOpen = index === openIndex;

          return (
            <section
              key={certificate.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#06070b] shadow-[0_20px_60px_-48px_rgba(255,255,255,0.08)] transition hover:border-white/20"
            >
              <button
                type="button"
                onClick={() => {
                  setOpenIndex(isOpen ? -1 : index);
                  setPopupVisible(!popupVisible);

                  // Fetch the image and display in the popup
                  if (!isOpen) {
                    // Example: Use setTimeout to simulate fetching an image
                    setTimeout(() => {
                      setPopupVisible(true);
                    }, 500);
                  }
                }}
                className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left text-white transition hover:bg-white/5"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-2">
                    Sertifika
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    {certificate.title}
                  </h2>
                </div>
                <span className={`text-2xl transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[1200px]" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-6">
                  <div className="rounded-[28px] border border-white/10 bg-zinc-950 overflow-hidden shadow-[0_24px_80px_-48px_rgba(0,0,0,0.7)]">
                    <div className="relative w-full min-h-[260px] aspect-[1.414/1]">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 72vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {certificate.description}
                  </p>
                </div>
              </div>
            </section>
          );
        })}

        {popupVisible && (
          <div
            onClick={() => setPopupVisible(false)}
            className="fixed inset-0 z-50 bg-black opacity-25"
          ></div>
        )}

        {popupVisible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Add the certificate image here */}
              <Image
                src={certificates[openIndex].image}
                alt={certificates[openIndex].title}
                width={400}
                height={300}
                objectFit="contain"
              />
              <p className="mt-2 text-center">
                {certificates[openIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

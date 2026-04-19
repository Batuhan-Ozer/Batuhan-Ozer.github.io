"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const helloText = mounted ? t.home.hello : translations.en.home.hello;
  const roleText = mounted ? t.home.role : translations.en.home.role;
  const welcomeText = mounted ? t.home.welcome : translations.en.home.welcome;
  const viewProjectsText = mounted ? t.home.viewProjects : translations.en.home.viewProjects;
  const aboutMeText = mounted ? t.home.aboutMe : translations.en.home.aboutMe;

  return (
    <div className="max-w-4xl">
      <p className="font-mono text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-zinc-400 uppercase mb-4 sm:mb-5" suppressHydrationWarning>
        {helloText}
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight break-words">
        Batuhan Özer
      </h1>

      <p className="text-red-500 font-mono text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10" suppressHydrationWarning>
        {roleText}
      </p>

      <p className="text-zinc-200 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed" suppressHydrationWarning>
        {welcomeText}
      </p>

      {/* <p className="text-zinc-500 text-base sm:text-lg md:text-xl mb-10 sm:mb-14">{t.home.email}</p> */}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14 sm:mb-20">
        <Link
          href="/projects"
          className="rounded-2xl bg-red-600 px-6 sm:px-8 py-3 sm:py-4 text-black text-lg sm:text-xl md:text-2xl font-medium hover:bg-red-500 text-center"
        >
          {viewProjectsText}
        </Link>

        <Link
          href="/about"
          className="rounded-2xl border border-[#1a222c] px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-medium text-white hover:bg-white/5 text-center"
        >
          {aboutMeText}
        </Link>
      </div>
    </div>
  );
}
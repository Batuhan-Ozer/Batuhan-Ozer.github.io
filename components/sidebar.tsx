"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "@/components/language-switcher";
import { Home, Settings, Folder, Briefcase, GraduationCap, FileText, Mail } from "lucide-react";

export default function Navbar() {
  const path = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  const linkStyle = (href: string) =>
    `inline-flex items-center gap-2 rounded-2xl px-4 py-2 transition text-sm font-medium whitespace-nowrap ${
      path === href
        ? "bg-red-600 text-white"
        : "text-zinc-200 hover:bg-white/10"
    }`;

  const navItems = [
    { href: "/", icon: <Home className="h-4 w-4" />, label: t.nav.home },
    { href: "/about", icon: <Settings className="h-4 w-4" />, label: t.nav.about },
    { href: "/projects", icon: <Folder className="h-4 w-4" />, label: t.nav.projects },
    { href: "/education", icon: <GraduationCap className="h-4 w-4" />, label: t.nav.education },
    { href: "/contact", icon: <Mail className="h-4 w-4" />, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#1a222c] bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <p className="text-red-500 font-mono text-xl sm:text-2xl font-bold">
            Batuhan
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkStyle(item.href)}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="md:hidden border-t border-[#1a222c] overflow-x-auto px-4 py-3">
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkStyle(item.href)}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

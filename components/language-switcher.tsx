"use client"

import { useLanguage } from "@/components/language-provider"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const buttonStyle = (active: boolean) =>
    `rounded-xl border px-4 py-2 text-sm transition ${
      active
        ? "border-red-600 bg-red-600/10 text-red-500"
        : "border-[#1a222c] text-white hover:bg-white/5"
    }`

  return (
    <div className="flex gap-2">
      <button onClick={() => setLanguage("tr")} className={buttonStyle(language === "tr")}>
        TR
      </button>
      <button onClick={() => setLanguage("en")} className={buttonStyle(language === "en")}>
        EN
      </button>
    </div>
  )
}
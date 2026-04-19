"use client"

import { createContext, useContext, useState } from "react"

type Language = "tr" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("site-language") as Language | null
      if (saved === "tr" || saved === "en") {
        return saved
      }
    }
    return "en"
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("site-language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}
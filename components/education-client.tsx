"use client";

import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";
import { Award, BookOpen } from "lucide-react";

type EducationItem = {
  id: number;
  level: string;
  institution: string;
  departmentTr: string;
  departmentEn: string;
  createdAt: string;
  updatedAt: string;
};

type CourseItem = {
  id: number;
  titleTr: string;
  titleEn: string;
  institution: string | null;
  descriptionTr: string | null;
  descriptionEn: string | null;
  createdAt: string;
  updatedAt: string;
};

function getLevelLabel(value: string, language: "tr" | "en") {
  if (language === "tr") {
    return value === "high-school" ? "Lise" : "Üniversite";
  }
  return value === "high-school" ? "High School" : "University";
}

export default function EducationClient({
  educationList,
  courses,
}: {
  educationList: EducationItem[];
  courses: CourseItem[];
}) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-10 sm:space-y-12">
      <section>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
          {t.education.title}
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-2xl border border-[#1a222c] p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-2">
              <h2 className="text-lg sm:text-xl font-semibold break-words">
                {t.education.schoolTitle}
              </h2>
            </div>
          </div>
          {educationList.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#1a222c] p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold break-words">
                  {item.institution}
                </h2>

                <span className="w-fit text-xs sm:text-sm rounded-full border border-[#1a222c] px-3 py-1">
                  {getLevelLabel(item.level, language)}
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-400 break-words">
                {language === "tr" ? item.departmentTr : item.departmentEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
          {t.education.coursesTitle}
        </h2>

        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-2xl border border-[#1a222c] p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold break-words">
                  {t.education.courseExample}
                </h3>
              </div>
            </div>
          </div>
          {courses.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#1a222c] p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold break-words">
                {language === "tr" ? item.titleTr : item.titleEn}
              </h3>

              {item.institution && (
                <p className="text-sm sm:text-base text-gray-500 mt-2 break-words">
                  {item.institution}
                </p>
              )}

              {(language === "tr" ? item.descriptionTr : item.descriptionEn) && (
                <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed break-words">
                  {language === "tr" ? item.descriptionTr : item.descriptionEn}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
          {t.education.certificatesTitle}
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {t.education.certificateList.map((certificate, index) => (
            <div key={index} className="rounded-2xl border border-[#1a222c] p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold break-words">
                    {certificate}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
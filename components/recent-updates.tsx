"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UpdateItem = {
  id: string;
  titleTr: string;
  titleEn: string;
  type:
    | "project"
    | "competition"
    | "experience"
    | "education"
    | "course"
    | "certificate"
    | "blog";
  date: string;
  href: string;
};

function getTypeLabel(type: UpdateItem["type"], language: "tr" | "en") {
  if (language === "tr") {
    switch (type) {
      case "project":
        return "Yeni Proje";
      case "competition":
        return "Yeni Yarışma";
      case "experience":
        return "Yeni İş Deneyimi";
      case "education":
        return "Yeni Eğitim";
      case "course":
        return "Yeni Kurs";
      case "certificate":
        return "Yeni Sertifika";
      case "blog":
        return "Yeni Blog Yazısı";
      default:
        return "Güncelleme";
    }
  }

  switch (type) {
    case "project":
      return "New Project";
    case "competition":
      return "New Competition";
    case "experience":
      return "New Work Experience";
    case "education":
      return "New Education";
    case "course":
      return "New Course";
    case "certificate":
      return "New Certificate";
    case "blog":
      return "New Blog Post";
    default:
      return "Update";
  }
}

type Props = {
  language: "tr" | "en";
  noUpdatesText: string;
};

export default function RecentUpdates({ language, noUpdatesText }: Props) {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUpdates() {
      try {
        const response = await fetch("/api/updates", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }

        const data = await response.json();

        if (isMounted) {
          setUpdates(data);
        }
      } catch (error) {
        console.error("Recent updates error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#1a222c] px-5 py-4 font-mono text-2xl text-zinc-500">
        {language === "tr" ? "Yükleniyor..." : "Loading..."}
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1a222c] px-5 py-4 font-mono text-2xl text-zinc-500">
        {noUpdatesText}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {updates.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="block rounded-2xl border border-[#1a222c] px-5 py-4 transition hover:bg-[#0b0f14]"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-zinc-500 mb-2">
            {getTypeLabel(item.type, language)}
          </p>

          <h3 className="text-xl text-white font-medium">
            {language === "tr" ? item.titleTr : item.titleEn}
          </h3>
        </Link>
      ))}
    </div>
  );
}
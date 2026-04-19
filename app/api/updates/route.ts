import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [projects, experiences, educations, courses, certificates, posts] =
      await Promise.all([
        prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.experience.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.education.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.course.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.certificate.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      ]);

    const updates = [
      ...projects.map((item) => ({
        id: `project-${item.id}`,
        titleTr: item.titleTr,
        titleEn: item.titleEn,
        type: item.type === "project" ? "project" : "competition",
        date: item.createdAt.toISOString(),
        href: `/projects/${item.slug}`,
      })),
      ...experiences.map((item) => ({
        id: `experience-${item.id}`,
        titleTr: `${item.companyName} - ${item.positionTr}`,
        titleEn: `${item.companyName} - ${item.positionEn}`,
        type: "experience",
        date: item.createdAt.toISOString(),
        href: "/work",
      })),
      ...educations.map((item) => ({
        id: `education-${item.id}`,
        titleTr: `${item.institution} - ${item.departmentTr}`,
        titleEn: `${item.institution} - ${item.departmentEn}`,
        type: "education",
        date: item.createdAt.toISOString(),
        href: "/education",
      })),
      ...courses.map((item) => ({
        id: `course-${item.id}`,
        titleTr: item.titleTr,
        titleEn: item.titleEn,
        type: "course",
        date: item.createdAt.toISOString(),
        href: "/education",
      })),
      ...certificates.map((item) => ({
        id: `certificate-${item.id}`,
        titleTr: item.titleTr,
        titleEn: item.titleEn,
        type: "certificate",
        date: item.createdAt.toISOString(),
        href: "/education",
      })),
      ...posts.map((item) => ({
        id: `blog-${item.id}`,
        titleTr: item.titleTr,
        titleEn: item.titleEn,
        type: "blog",
        date: item.createdAt.toISOString(),
        href: `/blog/${item.slug}`,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);

    return NextResponse.json(updates);
  } catch (error) {
    console.error("Updates API error:", error);
    return NextResponse.json({ error: "Failed to load updates" }, { status: 500 });
  }
}
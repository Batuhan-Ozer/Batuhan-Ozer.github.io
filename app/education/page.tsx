import { prisma } from "@/lib/prisma";
import EducationClient from "@/components/education-client";

export default async function EducationPage() {
  const [educationList, courses, certificates] = await Promise.all([
    prisma.education.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.certificate.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serializedEducation = educationList.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  const serializedCourses = courses.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  const serializedCertificates = certificates.map((item) => ({
    ...item,
    date: item.date ? item.date.toISOString() : null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <EducationClient
      educationList={serializedEducation}
      courses={serializedCourses}
      certificates={serializedCertificates}
    />
  );
}
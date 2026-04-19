import { prisma } from "@/lib/prisma";
import EducationClient from "@/components/education-client";

export default async function EducationPage() {
  const [educationList, courses] = await Promise.all([
    prisma.education.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
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

  return (
    <EducationClient
      educationList={serializedEducation}
      courses={serializedCourses}
    />
  );
}
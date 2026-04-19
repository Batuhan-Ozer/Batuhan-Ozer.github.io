import { prisma } from "@/lib/prisma";
import ProjectsClient from "@/components/projects-client";

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({
    include: { images: true },
    orderBy: { date: "desc" },
  });

  const serializedItems = items.map((item) => ({
    ...item,
    date: item.date.toISOString(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return <ProjectsClient items={serializedItems} />;
}
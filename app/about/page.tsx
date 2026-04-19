import { prisma } from "@/lib/prisma";
import AboutClient from "@/components/about-client";

export default async function AboutPage() {
  const about = await prisma.about.findUnique({
    where: { id: 1 },
  });

  const serializedAbout = about
    ? {
        ...about,
        updatedAt: about.updatedAt.toISOString(),
      }
    : null;

  return <AboutClient about={serializedAbout} />;
}
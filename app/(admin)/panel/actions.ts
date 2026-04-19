"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { revalidatePath } from "next/cache";

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveAbout(formData: FormData) {
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();

  if (!descriptionTr || !descriptionEn) {
    throw new Error("Hakkımda alanları zorunludur.");
  }

  await prisma.about.upsert({
    where: { id: 1 },
    update: {
      imageUrl: imageUrl || null,
      descriptionTr,
      descriptionEn,
    },
    create: {
      id: 1,
      imageUrl: imageUrl || null,
      descriptionTr,
      descriptionEn,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
  return;
}

export async function createProject(formData: FormData) {
  const type = String(formData.get("type") || "").trim();
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const subjectTr = String(formData.get("subjectTr") || "").trim();
  const subjectEn = String(formData.get("subjectEn") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const dateValue = String(formData.get("date") || "").trim();
  const githubUrl = String(formData.get("githubUrl") || "").trim();
  const imagesRaw = String(formData.get("images") || "").trim();

  if (
    !type ||
    !titleTr ||
    !titleEn ||
    !subjectTr ||
    !subjectEn ||
    !descriptionTr ||
    !descriptionEn ||
    !dateValue
  ) {
    throw new Error("Proje / yarışma alanlarını doldur.");
  }

  const slug = slugify(titleEn || titleTr);

  const existing = await prisma.project.findUnique({
    where: { slug },
  });

  if (existing) {
    throw new Error("Bu başlığa ait slug zaten var.");
  }

  const imageList = parseLines(imagesRaw);

  await prisma.project.create({
    data: {
      type,
      titleTr,
      titleEn,
      subjectTr,
      subjectEn,
      slug,
      descriptionTr,
      descriptionEn,
      date: new Date(dateValue),
      githubUrl: githubUrl || null,
      images: {
        create: imageList.map((url) => ({ url })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  return;
}

export async function updateProject(formData: FormData) {
  const id = Number(formData.get("id"));
  const type = String(formData.get("type") || "").trim();
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const subjectTr = String(formData.get("subjectTr") || "").trim();
  const subjectEn = String(formData.get("subjectEn") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const dateValue = String(formData.get("date") || "").trim();
  const githubUrl = String(formData.get("githubUrl") || "").trim();
  const imagesRaw = String(formData.get("images") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  const slug = slugify(titleEn || titleTr);
  const imageList = parseLines(imagesRaw);

  await prisma.project.update({
    where: { id },
    data: {
      type,
      titleTr,
      titleEn,
      subjectTr,
      subjectEn,
      slug,
      descriptionTr,
      descriptionEn,
      date: new Date(dateValue),
      githubUrl: githubUrl || null,
      images: {
        deleteMany: {},
        create: imageList.map((url) => ({ url })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  return;
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  return;
}

export async function createExperience(formData: FormData) {
  const companyName = String(formData.get("companyName") || "").trim();
  const positionTr = String(formData.get("positionTr") || "").trim();
  const positionEn = String(formData.get("positionEn") || "").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const endDate = String(formData.get("endDate") || "").trim();
  const isCurrent = formData.get("isCurrent") === "on";
  const workType = String(formData.get("workType") || "").trim();

  if (!companyName || !positionTr || !positionEn || !startDate || !workType) {
    throw new Error("İş deneyimi alanlarını doldur.");
  }

  await prisma.experience.create({
    data: {
      companyName,
      positionTr,
      positionEn,
      startDate: new Date(startDate),
      endDate: isCurrent || !endDate ? null : new Date(endDate),
      isCurrent,
      workType,
    },
  });

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  return;
}

export async function updateExperience(formData: FormData) {
  const id = Number(formData.get("id"));
  const companyName = String(formData.get("companyName") || "").trim();
  const positionTr = String(formData.get("positionTr") || "").trim();
  const positionEn = String(formData.get("positionEn") || "").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const endDate = String(formData.get("endDate") || "").trim();
  const isCurrent = formData.get("isCurrent") === "on";
  const workType = String(formData.get("workType") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.experience.update({
    where: { id },
    data: {
      companyName,
      positionTr,
      positionEn,
      startDate: new Date(startDate),
      endDate: isCurrent || !endDate ? null : new Date(endDate),
      isCurrent,
      workType,
    },
  });

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  return;
}

export async function deleteExperience(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  return;
}

export async function createEducation(formData: FormData) {
  const level = String(formData.get("level") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const departmentTr = String(formData.get("departmentTr") || "").trim();
  const departmentEn = String(formData.get("departmentEn") || "").trim();

  if (!level || !institution || !departmentTr || !departmentEn) {
    throw new Error("Eğitim alanlarını doldur.");
  }

  await prisma.education.create({
    data: {
      level,
      institution,
      departmentTr,
      departmentEn,
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function updateEducation(formData: FormData) {
  const id = Number(formData.get("id"));
  const level = String(formData.get("level") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const departmentTr = String(formData.get("departmentTr") || "").trim();
  const departmentEn = String(formData.get("departmentEn") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.education.update({
    where: { id },
    data: {
      level,
      institution,
      departmentTr,
      departmentEn,
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function deleteEducation(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.education.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function createCourse(formData: FormData) {
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();

  if (!titleTr || !titleEn) {
    throw new Error("Kurs başlıkları zorunlu.");
  }

  await prisma.course.create({
    data: {
      titleTr,
      titleEn,
      institution: institution || null,
      descriptionTr: descriptionTr || null,
      descriptionEn: descriptionEn || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function updateCourse(formData: FormData) {
  const id = Number(formData.get("id"));
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.course.update({
    where: { id },
    data: {
      titleTr,
      titleEn,
      institution: institution || null,
      descriptionTr: descriptionTr || null,
      descriptionEn: descriptionEn || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function deleteCourse(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function createCertificate(formData: FormData) {
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const dateValue = String(formData.get("date") || "").trim();
  const imagesRaw = String(formData.get("images") || "").trim();

  if (!titleTr || !titleEn) {
    throw new Error("Sertifika başlıkları zorunlu.");
  }

  const imageList = parseLines(imagesRaw);

  await prisma.certificate.create({
    data: {
      titleTr,
      titleEn,
      institution: institution || null,
      descriptionTr: descriptionTr || null,
      descriptionEn: descriptionEn || null,
      date: dateValue ? new Date(dateValue) : null,
      images: {
        create: imageList.map((url) => ({ url })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function updateCertificate(formData: FormData) {
  const id = Number(formData.get("id"));
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const dateValue = String(formData.get("date") || "").trim();
  const imagesRaw = String(formData.get("images") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  const imageList = parseLines(imagesRaw);

  await prisma.certificate.update({
    where: { id },
    data: {
      titleTr,
      titleEn,
      institution: institution || null,
      descriptionTr: descriptionTr || null,
      descriptionEn: descriptionEn || null,
      date: dateValue ? new Date(dateValue) : null,
      images: {
        deleteMany: {},
        create: imageList.map((url) => ({ url })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function deleteCertificate(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.certificate.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/education");
  revalidatePath("/admin");
  return;
}

export async function createBlogPost(formData: FormData) {
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!titleTr || !titleEn || !descriptionTr || !descriptionEn) {
    throw new Error("Blog alanlarını doldur.");
  }

  const slug = slugify(titleEn || titleTr);

  const existing = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (existing) {
    throw new Error("Bu blog başlığına ait slug zaten var.");
  }

  await prisma.blogPost.create({
    data: {
      titleTr,
      titleEn,
      descriptionTr,
      descriptionEn,
      imageUrl: imageUrl || null,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return;
}

export async function updateBlogPost(formData: FormData) {
  const id = Number(formData.get("id"));
  const titleTr = String(formData.get("titleTr") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const descriptionTr = String(formData.get("descriptionTr") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!id) throw new Error("Kayıt bulunamadı.");

  const slug = slugify(titleEn || titleTr);

  await prisma.blogPost.update({
    where: { id },
    data: {
      titleTr,
      titleEn,
      descriptionTr,
      descriptionEn,
      imageUrl: imageUrl || null,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return;
}

export async function deleteBlogPost(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Kayıt bulunamadı.");

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return;
}

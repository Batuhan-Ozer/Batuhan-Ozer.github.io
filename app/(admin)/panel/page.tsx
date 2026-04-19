import { prisma } from "@/lib/prisma";
import { logoutAdmin } from "./logout-action";
import {
  saveAbout,
  createProject,
  updateProject,
  deleteProject,
  createExperience,
  updateExperience,
  deleteExperience,
  createEducation,
  updateEducation,
  deleteEducation,
  createCourse,
  updateCourse,
  deleteCourse,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "./actions";

export default async function AdminPage() {
  const [about, projects, experiences, educations, courses, certificates, blogPosts] =
    await Promise.all([
      prisma.about.findUnique({ where: { id: 1 } }),
      prisma.project.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } }),
      prisma.experience.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.education.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.certificate.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } }),
      prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <form action={logoutAdmin}>
          <button className="rounded-xl border px-5 py-3 font-medium">
            Çıkış Yap
          </button>
        </form>
      </div>

      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Hakkımda</h2>
        <form action={saveAbout} className="space-y-4">
          <input
            name="imageUrl"
            defaultValue={about?.imageUrl ?? ""}
            placeholder="Profil fotoğraf URL"
            className="w-full rounded-xl border px-4 py-3"
          />
          <textarea
            name="descriptionTr"
            defaultValue={about?.descriptionTr ?? ""}
            placeholder="Hakkımda (TR)"
            className="w-full rounded-xl border px-4 py-3 min-h-[120px]"
            required
          />
          <textarea
            name="descriptionEn"
            defaultValue={about?.descriptionEn ?? ""}
            placeholder="About (EN)"
            className="w-full rounded-xl border px-4 py-3 min-h-[120px]"
            required
          />
          <button className="rounded-xl border px-5 py-3 font-medium">Kaydet</button>
        </form>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Proje / Yarışma</h2>
        <form action={createProject} className="space-y-4">
          <select name="type" className="w-full rounded-xl border px-4 py-3" required>
            <option value="">Tür Seç</option>
            <option value="project">Proje</option>
            <option value="competition">Yarışma</option>
          </select>
          <input name="titleTr" placeholder="Başlık (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="titleEn" placeholder="Title (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="subjectTr" placeholder="Konu (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="subjectEn" placeholder="Subject (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <textarea name="descriptionTr" placeholder="Açıklama (TR)" className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
          <textarea name="descriptionEn" placeholder="Description (EN)" className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
          <input type="date" name="date" className="w-full rounded-xl border px-4 py-3" required />
          <input type="url" name="githubUrl" placeholder="GitHub linki (isteğe bağlı)" className="w-full rounded-xl border px-4 py-3" />
          <textarea name="images" placeholder={`Her satıra bir görsel URL\nhttps://...`} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {projects.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateProject} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <select name="type" defaultValue={item.type} className="w-full rounded-xl border px-4 py-3" required>
                  <option value="project">Proje</option>
                  <option value="competition">Yarışma</option>
                </select>
                <input name="titleTr" defaultValue={item.titleTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="titleEn" defaultValue={item.titleEn} className="w-full rounded-xl border px-4 py-3" required />
                <input name="subjectTr" defaultValue={item.subjectTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="subjectEn" defaultValue={item.subjectEn} className="w-full rounded-xl border px-4 py-3" required />
                <textarea name="descriptionTr" defaultValue={item.descriptionTr} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" required />
                <textarea name="descriptionEn" defaultValue={item.descriptionEn} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" required />
                <input type="date" name="date" defaultValue={new Date(item.date).toISOString().split("T")[0]} className="w-full rounded-xl border px-4 py-3" required />
                <input type="url" name="githubUrl" defaultValue={item.githubUrl ?? ""} className="w-full rounded-xl border px-4 py-3" />
                <textarea
                  name="images"
                  defaultValue={item.images.map((img) => img.url).join("\n")}
                  className="w-full rounded-xl border px-4 py-3 min-h-[100px]"
                />
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteProject}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">İş Deneyimi</h2>
        <form action={createExperience} className="space-y-4">
          <input name="companyName" placeholder="Şirket Adı" className="w-full rounded-xl border px-4 py-3" required />
          <input name="positionTr" placeholder="Pozisyon (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="positionEn" placeholder="Position (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <select name="workType" className="w-full rounded-xl border px-4 py-3" required>
            <option value="">Çalışma tipi</option>
            <option value="full-time">Tam Zamanlı</option>
            <option value="freelance">Freelance</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Staj</option>
          </select>
          <input type="date" name="startDate" className="w-full rounded-xl border px-4 py-3" required />
          <input type="date" name="endDate" className="w-full rounded-xl border px-4 py-3" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isCurrent" />
            Devam Ediyor
          </label>
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {experiences.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateExperience} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <input name="companyName" defaultValue={item.companyName} className="w-full rounded-xl border px-4 py-3" required />
                <input name="positionTr" defaultValue={item.positionTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="positionEn" defaultValue={item.positionEn} className="w-full rounded-xl border px-4 py-3" required />
                <select name="workType" defaultValue={item.workType} className="w-full rounded-xl border px-4 py-3" required>
                  <option value="full-time">Tam Zamanlı</option>
                  <option value="freelance">Freelance</option>
                  <option value="part-time">Part-Time</option>
                  <option value="internship">Staj</option>
                </select>
                <input type="date" name="startDate" defaultValue={new Date(item.startDate).toISOString().split("T")[0]} className="w-full rounded-xl border px-4 py-3" required />
                <input type="date" name="endDate" defaultValue={item.endDate ? new Date(item.endDate).toISOString().split("T")[0] : ""} className="w-full rounded-xl border px-4 py-3" />
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isCurrent" defaultChecked={item.isCurrent} />
                  Devam Ediyor
                </label>
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteExperience}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Eğitim</h2>
        <form action={createEducation} className="space-y-4">
          <select name="level" className="w-full rounded-xl border px-4 py-3" required>
            <option value="">Seviye seç</option>
            <option value="high-school">Lise</option>
            <option value="university">Üniversite</option>
          </select>
          <input name="institution" placeholder="Kurum Adı" className="w-full rounded-xl border px-4 py-3" required />
          <input name="departmentTr" placeholder="Bölüm (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="departmentEn" placeholder="Department (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {educations.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateEducation} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <select name="level" defaultValue={item.level} className="w-full rounded-xl border px-4 py-3" required>
                  <option value="high-school">Lise</option>
                  <option value="university">Üniversite</option>
                </select>
                <input name="institution" defaultValue={item.institution} className="w-full rounded-xl border px-4 py-3" required />
                <input name="departmentTr" defaultValue={item.departmentTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="departmentEn" defaultValue={item.departmentEn} className="w-full rounded-xl border px-4 py-3" required />
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteEducation}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Kurslar</h2>
        <form action={createCourse} className="space-y-4">
          <input name="titleTr" placeholder="Başlık (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="titleEn" placeholder="Title (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="institution" placeholder="Kurum (isteğe bağlı)" className="w-full rounded-xl border px-4 py-3" />
          <textarea name="descriptionTr" placeholder="Açıklama (TR)" className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <textarea name="descriptionEn" placeholder="Description (EN)" className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {courses.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateCourse} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <input name="titleTr" defaultValue={item.titleTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="titleEn" defaultValue={item.titleEn} className="w-full rounded-xl border px-4 py-3" required />
                <input name="institution" defaultValue={item.institution ?? ""} className="w-full rounded-xl border px-4 py-3" />
                <textarea name="descriptionTr" defaultValue={item.descriptionTr ?? ""} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
                <textarea name="descriptionEn" defaultValue={item.descriptionEn ?? ""} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteCourse}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Sertifikalar</h2>
        <form action={createCertificate} className="space-y-4">
          <input name="titleTr" placeholder="Başlık (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="titleEn" placeholder="Title (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="institution" placeholder="Kurum (isteğe bağlı)" className="w-full rounded-xl border px-4 py-3" />
          <textarea name="descriptionTr" placeholder="Açıklama (TR)" className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <textarea name="descriptionEn" placeholder="Description (EN)" className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <input type="date" name="date" className="w-full rounded-xl border px-4 py-3" />
          <textarea name="images" placeholder={`Her satıra bir sertifika görsel URL\nhttps://...`} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {certificates.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateCertificate} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <input name="titleTr" defaultValue={item.titleTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="titleEn" defaultValue={item.titleEn} className="w-full rounded-xl border px-4 py-3" required />
                <input name="institution" defaultValue={item.institution ?? ""} className="w-full rounded-xl border px-4 py-3" />
                <textarea name="descriptionTr" defaultValue={item.descriptionTr ?? ""} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
                <textarea name="descriptionEn" defaultValue={item.descriptionEn ?? ""} className="w-full rounded-xl border px-4 py-3 min-h-[100px]" />
                <input type="date" name="date" defaultValue={item.date ? new Date(item.date).toISOString().split("T")[0] : ""} className="w-full rounded-xl border px-4 py-3" />
                <textarea
                  name="images"
                  defaultValue={item.images.map((img) => img.url).join("\n")}
                  className="w-full rounded-xl border px-4 py-3 min-h-[100px]"
                />
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteCertificate}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Blog</h2>
        <form action={createBlogPost} className="space-y-4">
          <input name="titleTr" placeholder="Başlık (TR)" className="w-full rounded-xl border px-4 py-3" required />
          <input name="titleEn" placeholder="Title (EN)" className="w-full rounded-xl border px-4 py-3" required />
          <textarea name="descriptionTr" placeholder="Açıklama (TR)" className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
          <textarea name="descriptionEn" placeholder="Description (EN)" className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
          <input type="url" name="imageUrl" placeholder="Fotoğraf URL (isteğe bağlı)" className="w-full rounded-xl border px-4 py-3" />
          <button className="rounded-xl border px-5 py-3 font-medium">Ekle</button>
        </form>

        <div className="space-y-6">
          {blogPosts.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4 space-y-4">
              <form action={updateBlogPost} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <input name="titleTr" defaultValue={item.titleTr} className="w-full rounded-xl border px-4 py-3" required />
                <input name="titleEn" defaultValue={item.titleEn} className="w-full rounded-xl border px-4 py-3" required />
                <textarea name="descriptionTr" defaultValue={item.descriptionTr} className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
                <textarea name="descriptionEn" defaultValue={item.descriptionEn} className="w-full rounded-xl border px-4 py-3 min-h-[120px]" required />
                <input type="url" name="imageUrl" defaultValue={item.imageUrl ?? ""} className="w-full rounded-xl border px-4 py-3" />
                <button className="rounded-xl border px-5 py-3 font-medium">Güncelle</button>
              </form>

              <form action={deleteBlogPost}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-xl border px-5 py-3 font-medium">Sil</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
/*
  Warnings:

  - You are about to drop the column `description` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `descriptionEn` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionTr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionTr` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleTr` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentEn` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentTr` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionEn` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionTr` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionTr` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectEn` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectTr` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleTr` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "institution" TEXT,
    "descriptionTr" TEXT,
    "descriptionEn" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "institution" TEXT,
    "descriptionTr" TEXT,
    "descriptionEn" TEXT,
    "date" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CertificateImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "certificateId" INTEGER NOT NULL,
    CONSTRAINT "CertificateImage_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "imageUrl" TEXT,
    "descriptionTr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_About" ("id", "imageUrl", "updatedAt") SELECT "id", "imageUrl", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
CREATE TABLE "new_BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionTr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "imageUrl" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("createdAt", "id", "imageUrl", "slug", "updatedAt") SELECT "createdAt", "id", "imageUrl", "slug", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE TABLE "new_Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "departmentTr" TEXT NOT NULL,
    "departmentEn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Education" ("createdAt", "id", "institution", "level", "updatedAt") SELECT "createdAt", "id", "institution", "level", "updatedAt" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "positionTr" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "workType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("companyName", "createdAt", "endDate", "id", "isCurrent", "startDate", "updatedAt", "workType") SELECT "companyName", "createdAt", "endDate", "id", "isCurrent", "startDate", "updatedAt", "workType" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "subjectTr" TEXT NOT NULL,
    "subjectEn" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descriptionTr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "githubUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "date", "githubUrl", "id", "slug", "type", "updatedAt") SELECT "createdAt", "date", "githubUrl", "id", "slug", "type", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `company` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `job_type` on the `Job` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "category" TEXT,
    "type" TEXT,
    "location" TEXT,
    "salary" TEXT,
    "descriptionHTML" TEXT,
    "descriptionText" TEXT,
    "status" TEXT DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Job" ("createdAt", "id", "location", "salary", "status", "title", "url") SELECT "createdAt", "id", "location", "salary", "status", "title", "url" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE UNIQUE INDEX "Job_url_key" ON "Job"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

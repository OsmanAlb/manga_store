/*
  Warnings:

  - You are about to drop the column `birthplace` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the `Comics` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "birthplace",
DROP COLUMN "twitter",
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Comics";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comic" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "pages" INTEGER NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

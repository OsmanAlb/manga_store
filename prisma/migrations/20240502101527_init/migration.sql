/*
  Warnings:

  - You are about to drop the column `AuthorId` on the `Comic` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_AuthorId_fkey";

-- AlterTable
ALTER TABLE "Comic" DROP COLUMN "AuthorId",
ADD COLUMN     "author" TEXT NOT NULL;

-- DropTable
DROP TABLE "Author";

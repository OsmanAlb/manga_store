/*
  Warnings:

  - You are about to drop the column `AuthorNum` on the `Author` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_AuthorId_fkey";

-- DropIndex
DROP INDEX "Author_AuthorNum_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "AuthorNum",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Author_id_seq";

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

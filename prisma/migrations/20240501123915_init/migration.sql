/*
  Warnings:

  - A unique constraint covering the columns `[AuthorNum]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AuthorNum` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AuthorId` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "AuthorNum" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comic" ADD COLUMN     "AuthorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_AuthorNum_key" ON "Author"("AuthorNum");

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "Author"("AuthorNum") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `comic_book_cover` on table `Comic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comic_book_pdf` on table `Comic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comic" ALTER COLUMN "comic_book_cover" SET NOT NULL,
ALTER COLUMN "comic_book_pdf" SET NOT NULL;

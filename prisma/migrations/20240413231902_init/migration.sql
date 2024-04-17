/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comics" DROP CONSTRAINT "Comics_authorId_fkey";

-- AlterTable
ALTER TABLE "Comics" DROP COLUMN "authorId";

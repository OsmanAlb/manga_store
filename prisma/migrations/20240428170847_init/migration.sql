/*
  Warnings:

  - Made the column `adminId` on table `Comic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_adminId_fkey";

-- AlterTable
ALTER TABLE "Comic" ALTER COLUMN "adminId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

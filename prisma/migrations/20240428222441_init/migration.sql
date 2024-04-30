/*
  Warnings:

  - You are about to drop the column `adminId` on the `Comic` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_adminId_fkey";

-- AlterTable
ALTER TABLE "Comic" DROP COLUMN "adminId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

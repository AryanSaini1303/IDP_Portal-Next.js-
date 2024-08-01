/*
  Warnings:

  - You are about to drop the column `batchYear` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "batchYear" TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "batchYear";

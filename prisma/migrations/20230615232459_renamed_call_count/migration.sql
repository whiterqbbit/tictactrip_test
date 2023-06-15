/*
  Warnings:

  - You are about to drop the column `callCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "callCount",
ADD COLUMN     "wordCount" INTEGER NOT NULL DEFAULT 0;

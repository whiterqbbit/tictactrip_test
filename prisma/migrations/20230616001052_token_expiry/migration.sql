-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenExpiry" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '1 day';

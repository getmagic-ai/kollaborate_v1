/*
  Warnings:

  - Added the required column `userEmail` to the `Heart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Heart" ADD COLUMN     "userEmail" TEXT NOT NULL;

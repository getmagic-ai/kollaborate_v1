/*
  Warnings:

  - You are about to drop the `SavedLead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedLead" DROP CONSTRAINT "SavedLead_brandId_fkey";

-- DropForeignKey
ALTER TABLE "SavedLead" DROP CONSTRAINT "SavedLead_userId_fkey";

-- DropTable
DROP TABLE "SavedLead";

-- CreateTable
CREATE TABLE "Saved" (
    "id" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Saved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "nc_1o1g___brand_master_dev"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

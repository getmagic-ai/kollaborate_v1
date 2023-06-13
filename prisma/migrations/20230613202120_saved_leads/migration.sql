/*
  Warnings:

  - You are about to drop the column `saved_leads` on the `nc_1o1g___brand_master_dev` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nc_1o1g___brand_master_dev" DROP COLUMN "saved_leads";

-- CreateTable
CREATE TABLE "SavedLead" (
    "id" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "SavedLead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedLead" ADD CONSTRAINT "SavedLead_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "nc_1o1g___brand_master_dev"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedLead" ADD CONSTRAINT "SavedLead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

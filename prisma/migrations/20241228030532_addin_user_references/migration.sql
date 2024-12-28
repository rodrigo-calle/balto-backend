/*
  Warnings:

  - You are about to drop the column `dayId` on the `DailyEntryObjectives` table. All the data in the column will be lost.
  - Added the required column `dailyEntryId` to the `DailyEntryObjectives` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyEntryObjectives" DROP CONSTRAINT "DailyEntryObjectives_dayId_fkey";

-- AlterTable
ALTER TABLE "DailyEntry" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "DailyEntryObjectives" DROP COLUMN "dayId",
ADD COLUMN     "dailyEntryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Week" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyEntry" ADD CONSTRAINT "DailyEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyEntryObjectives" ADD CONSTRAINT "DailyEntryObjectives_dailyEntryId_fkey" FOREIGN KEY ("dailyEntryId") REFERENCES "DailyEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

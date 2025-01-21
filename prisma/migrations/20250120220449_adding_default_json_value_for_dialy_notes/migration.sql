/*
  Warnings:

  - The `notes` column on the `DailyEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DailyEntry" DROP COLUMN "notes",
ADD COLUMN     "notes" JSONB NOT NULL DEFAULT '[]';

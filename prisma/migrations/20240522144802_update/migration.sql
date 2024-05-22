/*
  Warnings:

  - You are about to drop the column `travelDates` on the `trips` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "travelDates",
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;

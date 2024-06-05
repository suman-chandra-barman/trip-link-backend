/*
  Warnings:

  - Made the column `gender` on table `userProfiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userProfiles" ALTER COLUMN "gender" SET NOT NULL;

/*
  Warnings:

  - You are about to drop the column `endDate` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelType` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "travelDates" TIMESTAMP(3)[],
ADD COLUMN     "travelType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "contactInfo" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

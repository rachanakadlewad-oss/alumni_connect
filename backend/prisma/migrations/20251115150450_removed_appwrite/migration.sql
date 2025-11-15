/*
  Warnings:

  - You are about to drop the column `appwriteId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_appwriteId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "appwriteId";

/*
  Warnings:

  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fullName` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL;

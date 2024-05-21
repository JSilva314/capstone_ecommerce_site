/*
  Warnings:

  - Added the required column `miles` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cars" ADD COLUMN "miles" INTEGER NOT NULL DEFAULT 0;

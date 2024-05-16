/*
  Warnings:

  - You are about to drop the column `address` on the `orderHistory` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `orderHistory` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `orderHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderHistory" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "paymentMethod";

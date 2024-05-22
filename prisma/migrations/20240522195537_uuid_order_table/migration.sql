/*
  Warnings:

  - The primary key for the `orderHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "orderHistory" DROP CONSTRAINT "orderHistory_pkey",
ALTER COLUMN "orderId" DROP DEFAULT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "orderHistory_pkey" PRIMARY KEY ("orderId");
DROP SEQUENCE "orderHistory_orderId_seq";

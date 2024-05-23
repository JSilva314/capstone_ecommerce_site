/*
  Warnings:

  - The primary key for the `orderHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `orderId` column on the `orderHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "sold" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "orderHistory" DROP CONSTRAINT "orderHistory_pkey",
DROP COLUMN "orderId",
ADD COLUMN     "orderId" SERIAL NOT NULL,
ADD CONSTRAINT "orderHistory_pkey" PRIMARY KEY ("orderId");

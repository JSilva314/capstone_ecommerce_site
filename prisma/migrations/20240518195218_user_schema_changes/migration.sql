/*
  Warnings:

  - You are about to drop the column `Phone` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "Phone",
DROP COLUMN "paymentMethod",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

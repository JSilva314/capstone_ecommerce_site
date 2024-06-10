/*
  Warnings:

  - Added the required column `verificationCode` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN "verificationCode" INTEGER DEFAULT 0 NOT NULL;

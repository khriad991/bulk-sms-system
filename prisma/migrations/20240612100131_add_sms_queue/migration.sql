/*
  Warnings:

  - You are about to drop the column `createdAt` on the `smsqueue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `smsqueue` DROP COLUMN `createdAt`,
    ADD COLUMN `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

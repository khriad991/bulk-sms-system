/*
  Warnings:

  - You are about to drop the column `createdAt` on the `smtpconfiguration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `smtpconfiguration` DROP COLUMN `createdAt`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

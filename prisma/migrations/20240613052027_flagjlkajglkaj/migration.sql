/*
  Warnings:

  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedulesms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `Contact_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedulesms` DROP FOREIGN KEY `scheduleSMS_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `schedulesms` DROP FOREIGN KEY `scheduleSMS_userId_fkey`;

-- DropTable
DROP TABLE `contact`;

-- DropTable
DROP TABLE `schedulesms`;

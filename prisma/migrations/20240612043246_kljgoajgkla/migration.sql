/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `bcc_email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `cc_email` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `bcc_email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `cc_email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bcc_email` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cc_email` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `bcc_email_name_key` ON `bcc_email`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `cc_email_name_key` ON `cc_email`(`name`);

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SMTPConfiguration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `message_template` ADD COLUMN `smtpId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `smtpconfiguration` ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `SMTPConfiguration_name_key` ON `SMTPConfiguration`(`name`);

-- AddForeignKey
ALTER TABLE `message_template` ADD CONSTRAINT `message_template_smtpId_fkey` FOREIGN KEY (`smtpId`) REFERENCES `SMTPConfiguration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

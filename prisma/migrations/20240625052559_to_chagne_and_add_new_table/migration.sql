/*
  Warnings:

  - You are about to drop the column `smtpId` on the `message_template` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `smsqueue` table. All the data in the column will be lost.
  - Added the required column `email_listId` to the `SMSQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `SMSQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smtpId` to the `SMSQueue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message_template` DROP FOREIGN KEY `message_template_smtpId_fkey`;

-- AlterTable
ALTER TABLE `message_template` DROP COLUMN `smtpId`;

-- AlterTable
ALTER TABLE `smsqueue` DROP COLUMN `message`,
    ADD COLUMN `email_listId` INTEGER NOT NULL,
    ADD COLUMN `messageId` INTEGER NOT NULL,
    ADD COLUMN `smtpId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SMSQueue` ADD CONSTRAINT `SMSQueue_smtpId_fkey` FOREIGN KEY (`smtpId`) REFERENCES `SMTPConfiguration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SMSQueue` ADD CONSTRAINT `SMSQueue_email_listId_fkey` FOREIGN KEY (`email_listId`) REFERENCES `email_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SMSQueue` ADD CONSTRAINT `SMSQueue_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `message_template`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

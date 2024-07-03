-- AlterTable
ALTER TABLE `message_template` ALTER COLUMN `smtpId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `smtpconfiguration` ALTER COLUMN `name` DROP DEFAULT;

/*
  Warnings:

  - You are about to drop the `bcc_email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cc_email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bcc_email` DROP FOREIGN KEY `bcc_email_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cc_email` DROP FOREIGN KEY `cc_email_userId_fkey`;

-- DropTable
DROP TABLE `bcc_email`;

-- DropTable
DROP TABLE `cc_email`;

-- CreateTable
CREATE TABLE `email_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('CC', 'BCC') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cc_email` JSON NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email_list_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `email_list` ADD CONSTRAINT `email_list_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

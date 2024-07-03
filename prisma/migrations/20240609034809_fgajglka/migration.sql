/*
  Warnings:

  - You are about to drop the `bcc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bcc` DROP FOREIGN KEY `bcc_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cc` DROP FOREIGN KEY `cc_userId_fkey`;

-- DropTable
DROP TABLE `bcc`;

-- DropTable
DROP TABLE `cc`;

-- CreateTable
CREATE TABLE `cc_email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ccEmail` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bcc_email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bccEmail` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cc_email` ADD CONSTRAINT `cc_email_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bcc_email` ADD CONSTRAINT `bcc_email_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

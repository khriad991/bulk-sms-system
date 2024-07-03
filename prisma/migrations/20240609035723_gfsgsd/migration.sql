/*
  Warnings:

  - You are about to drop the column `bccEmail` on the `bcc_email` table. All the data in the column will be lost.
  - You are about to drop the column `ccEmail` on the `cc_email` table. All the data in the column will be lost.
  - Added the required column `bcc_email` to the `bcc_email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cc_email` to the `cc_email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bcc_email` DROP COLUMN `bccEmail`,
    ADD COLUMN `bcc_email` JSON NOT NULL;

-- AlterTable
ALTER TABLE `cc_email` DROP COLUMN `ccEmail`,
    ADD COLUMN `cc_email` JSON NOT NULL;

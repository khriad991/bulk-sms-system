/*
  Warnings:

  - You are about to drop the column `cc_email` on the `email_list` table. All the data in the column will be lost.
  - Added the required column `email_list` to the `email_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email_list` DROP COLUMN `cc_email`,
    ADD COLUMN `email_list` JSON NOT NULL;

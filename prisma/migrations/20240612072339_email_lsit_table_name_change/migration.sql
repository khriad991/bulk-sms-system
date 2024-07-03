/*
  Warnings:

  - You are about to drop the column `email_list` on the `email_list` table. All the data in the column will be lost.
  - Added the required column `all_email` to the `email_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email_list` DROP COLUMN `email_list`,
    ADD COLUMN `all_email` JSON NOT NULL;

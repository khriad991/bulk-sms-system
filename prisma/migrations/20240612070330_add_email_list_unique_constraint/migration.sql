/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `email_list` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `email_list_name_key` ON `email_list`;

-- CreateIndex
CREATE UNIQUE INDEX `email_list_name_type_key` ON `email_list`(`name`, `type`);

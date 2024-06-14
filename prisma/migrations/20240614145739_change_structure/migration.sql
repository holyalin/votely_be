/*
  Warnings:

  - The primary key for the `token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `history` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `option` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `polling` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `token` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`token`);

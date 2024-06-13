/*
  Warnings:

  - Added the required column `category_id` to the `polling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `history` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `option` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `polling` ADD COLUMN `category_id` INTEGER NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

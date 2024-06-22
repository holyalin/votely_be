-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `history` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `option` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `polling` ALTER COLUMN `updated_at` DROP DEFAULT;

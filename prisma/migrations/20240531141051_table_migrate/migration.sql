/*
  Warnings:

  - The primary key for the `option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `option` table. All the data in the column will be lost.
  - You are about to drop the column `pollId` on the `option` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `option` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `option` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `poll` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name_category` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `option` DROP FOREIGN KEY `Option_pollId_fkey`;

-- DropForeignKey
ALTER TABLE `poll` DROP FOREIGN KEY `Poll_userId_fkey`;

-- AlterTable
ALTER TABLE `option` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `pollId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `votes`,
    ADD COLUMN `img` VARCHAR(191) NULL,
    ADD COLUMN `name_category` VARCHAR(191) NOT NULL,
    ADD COLUMN `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT,
    ADD PRIMARY KEY (`option_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `poll`;

-- CreateTable
CREATE TABLE `Polling` (
    `poll_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `category` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `img` VARCHAR(191) NULL,
    `deadline` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`poll_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,

    PRIMARY KEY (`history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name_category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_category_key`(`name_category`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

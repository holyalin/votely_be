/*
  Warnings:

  - You are about to drop the column `description` on the `poll` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `poll` table. All the data in the column will be lost.
  - Added the required column `category` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poll` DROP COLUMN `description`,
    DROP COLUMN `title`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

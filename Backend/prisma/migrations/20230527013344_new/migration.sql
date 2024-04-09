/*
  Warnings:

  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` ADD COLUMN `city` VARCHAR(45) NOT NULL,
    MODIFY `street` VARCHAR(85) NOT NULL,
    MODIFY `commune` VARCHAR(85) NOT NULL;

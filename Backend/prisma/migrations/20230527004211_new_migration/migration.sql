/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_propertyId_fkey`;

-- AlterTable
ALTER TABLE `agent` ADD COLUMN `imageId` INTEGER NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `propertyId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Agent_imageId_key` ON `Agent`(`imageId`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agent` ADD CONSTRAINT `Agent_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

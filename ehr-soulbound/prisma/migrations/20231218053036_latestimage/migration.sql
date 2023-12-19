/*
  Warnings:

  - Added the required column `imageFile` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthRecord" ADD COLUMN     "imageFile" BYTEA NOT NULL;

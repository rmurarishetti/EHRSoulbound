/*
  Warnings:

  - You are about to drop the `HealthReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LabReport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageFile` to the `LabRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HealthReport" DROP CONSTRAINT "HealthReport_HealthRecordId_fkey";

-- DropForeignKey
ALTER TABLE "LabReport" DROP CONSTRAINT "LabReport_LabRecordId_fkey";

-- AlterTable
ALTER TABLE "LabRecord" ADD COLUMN     "imageFile" BYTEA NOT NULL;

-- DropTable
DROP TABLE "HealthReport";

-- DropTable
DROP TABLE "LabReport";

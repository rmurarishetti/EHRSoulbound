-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "specialization" TEXT,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabRecord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "labTest" TEXT,
    "healthRecordId" INTEGER NOT NULL,

    CONSTRAINT "LabRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabReport" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "LabRecordId" INTEGER NOT NULL,

    CONSTRAINT "LabReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthRecord" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "consentExpiry" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "disease" TEXT,
    "symptoms" TEXT,
    "medsTaken" TEXT,
    "sideEffects" TEXT,
    "symptomsPersist" BOOLEAN,

    CONSTRAINT "HealthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthReport" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "HealthRecordId" INTEGER NOT NULL,

    CONSTRAINT "HealthReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LabRecord_healthRecordId_key" ON "LabRecord"("healthRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "LabReport_publicId_key" ON "LabReport"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "LabReport_LabRecordId_key" ON "LabReport"("LabRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthRecord_patientId_key" ON "HealthRecord"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthRecord_doctorId_key" ON "HealthRecord"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthReport_publicId_key" ON "HealthReport"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthReport_HealthRecordId_key" ON "HealthReport"("HealthRecordId");

-- AddForeignKey
ALTER TABLE "LabRecord" ADD CONSTRAINT "LabRecord_healthRecordId_fkey" FOREIGN KEY ("healthRecordId") REFERENCES "HealthRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabReport" ADD CONSTRAINT "LabReport_LabRecordId_fkey" FOREIGN KEY ("LabRecordId") REFERENCES "LabRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthRecord" ADD CONSTRAINT "HealthRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthRecord" ADD CONSTRAINT "HealthRecord_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthReport" ADD CONSTRAINT "HealthReport_HealthRecordId_fkey" FOREIGN KEY ("HealthRecordId") REFERENCES "HealthRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

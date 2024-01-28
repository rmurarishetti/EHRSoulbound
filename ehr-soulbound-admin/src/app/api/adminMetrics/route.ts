import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const patients = await prisma.patient.findMany();
  const patientCount = patients.length;

  const doctors = await prisma.doctor.findMany();
  const doctorCount = doctors.length;

  const records = await prisma.healthRecord.findMany();
  const recordCount = records.length;

  return NextResponse.json({ patientCount, doctorCount, recordCount });
}

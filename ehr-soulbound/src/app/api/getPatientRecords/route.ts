import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const patientcurrent = await prisma.patient.findUnique({
    where: {
      email: formData.getAll("useremail")[0].toString(),
    },
  });

  const records = await prisma.healthRecord.findMany({
    where: {
      patientId: patientcurrent?.id, // Add null check here
    },
  });

  const recordsWithDoctor = [];
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: record.doctorId,
      },
    });
    recordsWithDoctor.push({
      ...record,
      doctor,
    });
  }

  return NextResponse.json(recordsWithDoctor);
}

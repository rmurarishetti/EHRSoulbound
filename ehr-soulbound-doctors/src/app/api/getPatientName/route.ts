import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const patientParticulars = await req.formData();
  const id = patientParticulars.getAll("id")[0].toString();

  const patient = await prisma.patient.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
    },
  });

  return NextResponse.json(patient);
}

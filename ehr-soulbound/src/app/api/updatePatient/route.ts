import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const patientParticulars = await req.formData();
  const p_email = patientParticulars.getAll("email")[0].toString();
  const p_name = patientParticulars.getAll("name")[0].toString();

  if (p_email == "" || p_name == "" || p_email == null || p_name == null) {
    return NextResponse.error();
  } else {
    const patient = await prisma.patient.upsert({
      where: { email: p_email },
      update: {
        name: p_name,
      },
      create: {
        email: p_email,
        name: p_name,
      },
    });
    return NextResponse.json({ message: "success" });
  }
}

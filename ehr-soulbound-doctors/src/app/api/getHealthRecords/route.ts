import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const docEmail = formData.get("docemail");

  if (!docEmail) {
    return NextResponse.error();
  }
  const doctorCurrent = await prisma.doctor.findUnique({
    where: {
      email: docEmail ? docEmail.toString() : "",
    },
  });

  const records = await prisma.healthRecord.findMany({
    where: {
      doctorId: doctorCurrent?.id, // Add null check here
      // consentExpiry: {
      //     gt: new Date(), // Add check for consentexpiry greater than now
      // },
    },
  });

  return NextResponse.json(records);
}

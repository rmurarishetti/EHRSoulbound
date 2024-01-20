import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const healthRecordId = formData.getAll("healthRecordId")[0].toString();

  if (!healthRecordId) {
    return NextResponse.error();
  }

  const records = await prisma.healthRecord.findUnique({
    where: {
      id: parseInt(healthRecordId),
    },
    select: {
      remarks: true,
    },
  });

  return NextResponse.json(records);
}

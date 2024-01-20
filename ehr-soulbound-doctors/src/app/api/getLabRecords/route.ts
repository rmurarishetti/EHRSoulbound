import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const healthRecordId = formData.getAll("healthRecordId")[0].toString();

  const records = await prisma.labRecord.findUnique({
    where: {
      healthRecordId: parseInt(healthRecordId),
    },
  });

  return NextResponse.json(records);
}

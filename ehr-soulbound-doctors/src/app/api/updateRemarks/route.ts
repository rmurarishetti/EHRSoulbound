import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const remarks = formData.getAll("remarks")[0].toString();
  const healthRecordId = formData.getAll("healthRecordId")[0].toString();
  const doctorId = formData.getAll("doctorId")[0].toString();

  if (!healthRecordId || !doctorId || !remarks) {
    return NextResponse.error();
  }

  try {
    const updatedHealthRecord = await prisma.healthRecord.update({
      where: { id: parseInt(healthRecordId) },
      data: { remarks: remarks },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.error();
  }
}

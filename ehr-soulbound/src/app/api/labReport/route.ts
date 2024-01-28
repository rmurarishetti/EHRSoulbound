import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const imageFile: File | null = formData.get(
    "labReportFile"
  ) as unknown as File;
  if (!imageFile) {
    return NextResponse.json({ success: false });
  }

  const bytes = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(bytes);

  const healthRecordId = formData.getAll("healthRecordId")[0].toString();
  const labTest = formData.getAll("labTest")[0].toString();

  const result = await prisma.labRecord.create({
    data: {
      date: new Date(),
      healthRecordId: parseInt(healthRecordId),
      labTest: labTest,
      imageFile: imageBuffer,
    },
  });
  return NextResponse.json({ message: "success" });
}

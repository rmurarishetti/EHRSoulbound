import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  const doctors = await prisma.doctor.findMany();

  return NextResponse.json(doctors);
}

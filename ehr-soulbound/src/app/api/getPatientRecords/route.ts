import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const formData = await req.formData();

    const patientcurrent = await prisma.patient.findUnique({
        where: {
            email: formData.getAll('useremail')[0].toString(),
        },
    })

    const records = await prisma.healthRecord.findMany({
        where: {
            patientId: patientcurrent?.id, // Add null check here
        },
    });

    return NextResponse.json(records);
}

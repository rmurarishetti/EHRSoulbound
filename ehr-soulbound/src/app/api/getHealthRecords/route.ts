import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const formData = await req.formData();

    const doctorCurrent = await prisma.doctor.findUnique ({
        where: {
            email: 'doctor@doctor.com',
        },
    })

    const records = await prisma.healthRecord.findMany({
        where: {
            doctorId: doctorCurrent?.id, // Add null check here
        },
    });

    return NextResponse.json(records);
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const formData = await req.formData();
    const doctorId = formData.getAll('doctorId')[0].toString();

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: parseInt(doctorId),
        },
        
    });

    return NextResponse.json(doctor);
}
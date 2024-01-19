import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const doctorParticulars = await req.formData();
    const d_email = doctorParticulars.getAll('docemail')[0].toString();
    
    
    if (d_email == ""|| d_email == null) {
        return NextResponse.error();
    }
    else {
        const doctor = await prisma.doctor.findUnique({
            where: { email: d_email },
        })
        return NextResponse.json(doctor);
    }
    
}
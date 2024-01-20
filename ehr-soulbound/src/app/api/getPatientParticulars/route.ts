import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const patientParticulars = await req.formData();
    const p_email = patientParticulars.getAll('email')[0].toString();
    
    
    if (p_email == ""|| p_email == null) {
        return NextResponse.error();
    }
    else {
        const patient = await prisma.patient.findUnique({
            where: { email: p_email?p_email.toString():"" },
        })
        return NextResponse.json(patient);
    }
    
}
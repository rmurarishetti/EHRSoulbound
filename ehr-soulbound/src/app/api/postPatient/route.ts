import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request){
    const patientParticulars = await req.formData();
    const p_email = patientParticulars.get('email');
    const p_name = patientParticulars.get('name');
    
    if (p_email == "" || p_name == "" || p_email == null || p_name == null) {
        return NextResponse.error();
    }
    else{
        const patient = await prisma.patient.upsert({
            where: { email: p_email},
            update: {},
            create:{
                email: p_email,
                name: p_name,
            },
        })
        return NextResponse.json(patient);
    }
    
}
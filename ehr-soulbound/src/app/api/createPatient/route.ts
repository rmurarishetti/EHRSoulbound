import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
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
        return NextResponse.json({ message: "success" });
    }
    
}
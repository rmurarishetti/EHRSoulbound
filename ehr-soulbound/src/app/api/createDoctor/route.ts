import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest){
    const doctorParticulars = await req.formData();
    const d_email = doctorParticulars.getAll('docemail')[0].toString();
    const d_name = doctorParticulars.getAll('docname')[0].toString();
    //const d_specialization = doctorParticulars.getAll('specialization')[0].toString();
    
    if (d_email == "" || d_name == "" || d_email == null || d_name == null) {
        return NextResponse.error();
    }
    else {
        const doctor = await prisma.doctor.upsert({
            where: { email: d_email },
            update: {},
            create:{
                email: d_email,
                name: d_name,
                //specialization: d_specialization,
            },
        })
        return NextResponse.json({ message: "success" });
    }
    
}
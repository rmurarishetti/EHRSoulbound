import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function POST(req: NextRequest){
    const formData = await req.formData();
    const imageFile: File | null = formData.get('prescriptionfile') as unknown as File;
    if (!imageFile) {
        return NextResponse.json({success: false})
    }
    let boolval = true;
    if (formData.getAll('userrecoverystatus')[0].toString()=='no') {
        boolval = false;
    }
    const bytes = await imageFile.arrayBuffer()
    const imageBuffer = Buffer.from(bytes)
    
    const patientCurrent = await prisma.patient.findUnique({
        where: {
            email: formData.getAll('useremail')[0].toString(),
        },
    })

    const doctorCurrent = await prisma.doctor.findUnique({
        where: {
            id: parseInt(formData.getAll('doctorid')[0].toString(), 10),
        },
    })
    
    const disease = formData.getAll('userdisease')[0].toString();
    const symptoms = formData.getAll('usersymptoms')[0].toString();
    const medsTaken = formData.getAll('usermeds')[0].toString();
    const sideEffects = formData.getAll('usersideeffects')[0].toString();

    const result = await prisma.healthRecord.create({
        data: {
            patientId: patientCurrent.id,
            doctorId: doctorCurrent.id,
            uploadDate: new Date(),
            consentExpiry: new Date(Date.now() + 12096e5),
            remarks: "ok", //Modify this
            disease: disease,
            symptoms: symptoms,
            medsTaken: medsTaken,
            sideEffects: sideEffects,
            symptomsPersist: boolval,
            imageFile: imageBuffer,
        },
    })
    return NextResponse.json({ message: "success" })
}
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
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
    const result = await prisma.healthRecord.upsert({
        where: { patientId: 1 }, //Modify this
        update: {
            patientId: 1, //Modify this
            doctorId: parseInt(formData.getAll('doctorid')[0].toString()),
            uploadDate: new Date(),
            consentExpiry: new Date(), //Modify this
            remarks: "ok", //Modify this
            disease: formData.getAll('userdisease')[0].toString(),
            symptoms: formData.getAll('usersymptoms')[0].toString(),
            medsTaken: formData.getAll('usermeds')[0].toString(),
            sideEffects: formData.getAll('usersideeffects')[0].toString(),
            symptomsPersist: boolval,
            imageFile: imageBuffer,
        },
        create:{
            patientId: 1, //Modify this
            doctorId: parseInt(formData.getAll('doctorid')[0].toString()),
            uploadDate: new Date(),
            consentExpiry: new Date(), //Modify this
            remarks: "ok", //Modify this
            disease: formData.getAll('userdisease')[0].toString(),
            symptoms: formData.getAll('usersymptoms')[0].toString(),
            medsTaken: formData.getAll('usermeds')[0].toString(),
            sideEffects: formData.getAll('usersideeffects')[0].toString(),
            symptomsPersist: boolval,
            imageFile: imageBuffer,
        },
    })
    return NextResponse.json({ message: "success" })
}
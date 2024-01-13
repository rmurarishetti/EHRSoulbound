import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    
        const patientParticulars = await req.formData();
        const id = patientParticulars.getAll("id")[0].toString();

        const patient = await prisma.patient.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                name: true,
            },
        });

        return NextResponse.json(patient);
}

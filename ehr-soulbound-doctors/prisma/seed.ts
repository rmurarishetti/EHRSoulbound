import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main(){
    const patient = await prisma.patient.upsert({
        where: { email:'test@test.com' },
        update: {},
        create:{
            email:'test@test.com',
            name: 'Test User',
        },
    })

    const doctor1 = await prisma.doctor.upsert({
      where: { email:'test@doctor.com' },
        update: {},
        create:{
            email:'test@doctor.com',
            name: 'Heisenberg Bohr',
            specialization: 'Immunology',
        },
    })

    const doctor2 = await prisma.doctor.upsert({
      where: { email:'doctor@doctor.com' },
        update: {},
        create:{
            email:'doctor@doctor.com',
            name: 'Albert Einstein',
            specialization: 'Cardiology',
        },
    })
    //console.log({patient}, {doctor1}, {doctor2})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    //console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
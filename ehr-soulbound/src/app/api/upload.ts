
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function handleHR(req: any, res: any) {
    //const imageUploaded = await getImage(req);
    
    //const imageData = await uploadImage(imageUploaded.path);
    
    // const result = await prisma.healthReport.create({
    //     data: {
    //     publicId: imageData.public_id,
    //     format: imageData.format,
    //     version: imageData.version.toString(),
    //     },
    // });
    
    // res.json(result);
    
}

export async function handleLR(req: any, res: any) {
    //const imageUploaded = await getImage(req);
    
    //const imageData = await uploadImage(imageUploaded.path);
}
// export default async function handle(req, res) {
//   const imageUploaded = await getImage(req);

//   const imageData = await uploadImage(imageUploaded.path);

//   const result = await prisma.image.create({
//     data: {
//       publicId: imageData.public_id,
//       format: imageData.format,
//       version: imageData.version.toString(),
//     },
//   });

//   res.json(result);
// }
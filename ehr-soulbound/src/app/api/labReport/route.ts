
import { NextResponse } from 'next/server';
 
export async function POST(req: Request) {
    
    const formData = await req.formData();
    const imageFile = formData.get('labreportfile');
    const imageData = new FormData();
    imageData.append('file', imageFile as File);
    imageData.append('upload_preset', 'labReport');
    const imageUploaded = await fetch( "https://api.cloudinary.com/v1_1/dga8afqxx/image/upload",{
        method: 'POST',
        body: imageData,
    }).then(res => res.json())
    
    console.log(imageUploaded)
    
    return NextResponse.json({ message: "success" })
    
    
}


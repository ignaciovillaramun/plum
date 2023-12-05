import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Image from '../../../../models/image';

export async function GET() {
  try {
    await connectMongoDB();
    const images = await Image.find();
    return NextResponse.json(images);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Image.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Url Deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Image from '../../../../models/image';

export async function GET() {
  await connectMongoDB();
  const images = await Image.find();
  return NextResponse.json(images);
}

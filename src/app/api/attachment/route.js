import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
// import Image from '../../../../models/image';
import Attachment from '../../../../models/attachment';

export async function GET() {
  try {
    await connectMongoDB();
    const attachment = await Attachment.find();
    return NextResponse.json(attachment);
  } catch (error) {
    console.log(error);
  }
}

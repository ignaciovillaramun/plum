import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
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

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Attachment.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Url Deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

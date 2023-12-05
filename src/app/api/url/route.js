import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Url from '../../../../models/urls';

export async function GET() {
  try {
    await connectMongoDB();
    const attachment = await Url.find();
    return NextResponse.json(attachment);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Url.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Url Deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

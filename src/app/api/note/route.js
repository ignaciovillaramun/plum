import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
// import Image from '../../../../models/image';
import Notes from '../../../../models/notes';

export async function GET() {
  try {
    await connectMongoDB();
    const notes = await Notes.find();
    return NextResponse.json(notes);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Notes.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Url Deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

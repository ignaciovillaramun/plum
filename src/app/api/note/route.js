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

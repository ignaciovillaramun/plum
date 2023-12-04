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

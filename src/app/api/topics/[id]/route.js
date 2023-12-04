import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newImage: image } = await req.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, image });
    return NextResponse.json({ message: 'Topic Updated' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });
    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

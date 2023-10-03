import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newTopic: topic,
    newImage: image,
  } = await req.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, topic, image });
  return NextResponse.json({ message: 'Topic Updated' }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

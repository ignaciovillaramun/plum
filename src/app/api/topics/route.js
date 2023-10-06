import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Topic from '../../../../models/topic';

export async function POST(req) {
  const { title, topic, image, userId } = await req.json();
  console.log(title, topic, 'image', userId);
  await connectMongoDB();
  await Topic.create({ title, topic, image, userId });
  return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json(topics);
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic Deleted' }, { status: 200 });
}

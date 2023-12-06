import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Related from '../../../../models/relatedTopics';
import User from '../../../../models/user';

export async function GET() {
  await connectMongoDB();
  const relatedTopics = await Related.find();
  return NextResponse.json(relatedTopics);
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Related.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Related Topic Deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  try {
    console.log('hello');
    const { title, image, user, parentTopic, topicId } = await req.json();
    console.log(topicId);
    await connectMongoDB();
    const data = await Related.create({
      title,
      image,
      user,
      topicId,
      parentTopic,
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

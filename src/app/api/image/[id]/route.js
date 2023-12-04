import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';
import Image from '../../../../../models/image';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const {
      newTitle: title,
      newTopic: topic,
      newImage: image,
    } = await req.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, topic, image });
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
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, { params }) {
  try {
    const { title, image, description } = await req.json();
    const { id } = params;
    await connectMongoDB();
    const userExists = await Topic.findById({ _id: id });

    if (!userExists) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }

    const data = await Image.create({ title, image, description, topic: id });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

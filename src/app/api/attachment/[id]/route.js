import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';
// import Image from '../../../../../models/image';
import Attachment from '../../../../../models/attachment';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title } = await req.json();
    await connectMongoDB();
    await Attachment.findByIdAndUpdate(id, { title });
    return NextResponse.json(
      { message: 'Attachment Updated' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const attachment = await Attachment.findOne({ _id: id });
    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, { params }) {
  try {
    const { title, attachment } = await req.json();
    const { id } = params;
    await connectMongoDB();
    const userExists = await Topic.findById({ _id: id });
    if (!userExists) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    const data = await Attachment.create({ title, attachment, topic: id });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

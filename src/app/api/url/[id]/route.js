import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';
import Url from '../../../../../models/urls';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, url } = await req.json();
    console.log(title, url);
    await connectMongoDB();
    await Url.findByIdAndUpdate(id, { title, url });
    return NextResponse.json({ message: 'Topic Updated' }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log(id);
    await connectMongoDB();
    const url = await Url.findOne({ _id: id });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, { params }) {
  try {
    const { title, url } = await req.json();
    const { id } = params;
    await connectMongoDB();
    const userExists = await Topic.findById({ _id: id });
    if (!userExists) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    const data = await Url.create({ title, url, topic: id });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

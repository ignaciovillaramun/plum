import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Topic from '../../../../models/topic';
import User from '../../../../models/user';

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

export async function POST(req) {
  const { title, image, user } = await req.json();
  console.log(title, 'image', typeof user, user);

  try {
    await connectMongoDB();
    const userExists = await User.findById({ _id: user });

    if (!userExists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const data = await Topic.create({ title, image, user });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

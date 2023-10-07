import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongo/index';
import Topic from '../../../../models/topic';
import User from '../../../../models/user';

// export async function POST(req) {
//   const { title, topic, image, user } = await req.json();
//   console.log(title, topic, 'image', typeof user, user);
//   await connectMongoDB();
//   await Topic.create({ title, topic, image, user });
//   return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
// }

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
  const { title, topic, image, user } = await req.json();
  console.log(title, topic, 'image', typeof user, user);

  try {
    await connectMongoDB();

    // Verify if the user with the provided user exists
    const userExists = await User.findById({ _id: user });
    const id = userExists._id;

    if (!userExists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create the topic with the correct user reference
    const data = await Topic.create({ title, topic, image, user });

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating topic' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongo/index';
import Topic from '../../../../../models/topic';
// import Image from '../../../../../models/image';
import Note from '../../../../../models/notes';

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const {
//     newTitle: title,
//     newTopic: topic,
//     newImage: image,
//   } = await req.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, topic, image });
//   return NextResponse.json({ message: 'Topic Updated' }, { status: 200 });
// }

export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log(id);
    await connectMongoDB();
    const note = await Note.findOne({ _id: id });
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, { params }) {
  try {
    const { title, description } = await req.json();
    const { id } = params;
    await connectMongoDB();
    const userExists = await Topic.findById({ _id: id });
    if (!userExists) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    const data = await Note.create({ title, description, topic: id });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating note' },
      { status: 500 }
    );
  }
}

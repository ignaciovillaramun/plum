import { connectMongoDB } from '../../../../../lib/mongo/index';
import User from '../../../../../models/user';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ email: id });
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { themeColor } = await req.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { theme: themeColor });
  return NextResponse.json({ message: 'Theme Updated' }, { status: 200 });
}

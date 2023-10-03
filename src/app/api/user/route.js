import { connectMongoDB } from '../../../../lib/mongo/index';
import User from '../../../../models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email } = await req.json();
  await connectMongoDB();
  await User.create({ name, email });
  return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}


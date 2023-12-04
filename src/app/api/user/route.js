import { connectMongoDB } from '../../../../lib/mongo/index';
import User from '../../../../models/user';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function POST(req) {
  try {
    const { name, email, image, theme } = await req.json();
    await connectMongoDB();
    await User.create({ name, email, image, theme });
    return NextResponse.json({ message: 'User Registered' }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}

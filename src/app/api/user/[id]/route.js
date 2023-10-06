import { connectMongoDB } from '../../../../../lib/mongo/index';
import User from '../../../../../models/user';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ email: id });
  return NextResponse.json(user, { status: 200 });
}

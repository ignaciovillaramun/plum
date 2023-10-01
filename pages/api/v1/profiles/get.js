import { connectMongoDB } from '../../../../lib/mongo/index';
import User from '../../../../models/user';

export default async function GET(request, response) {
  if (request.method === 'GET') {
    try {
      await connectMongoDB();
      const allUsers = await User.find({});

      return response.status(200).json(allUsers);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch users!' });
    }
  }

  response.setHeader('Allow', ['GET']);
  response.status(405).end(`Method ${request.method} is not allowed`);
}

import { getProfiles } from '../../../../lib/mongo/profiles';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { profiles, error } = await getProfiles();
      if (error) throw new Error(error);

      return res.status(200).json({
        status: 'success',
        data: profiles,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} is not allowed`);
};

export default handler;

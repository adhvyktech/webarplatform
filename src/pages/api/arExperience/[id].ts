import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // TODO: Fetch AR experience data from your database or storage
  const arData = {
    id,
    contentUrl: 'https://example.com/ar-content.png',
    scale: 1,
    rotation: 0,
  };

  res.status(200).json(arData);
}
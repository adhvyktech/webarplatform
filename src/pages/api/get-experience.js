import { getExperience } from '../../utils/arExperienceStorage';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const experience = await getExperience(id);
      if (experience) {
        res.status(200).json(experience);
      } else {
        res.status(404).json({ error: 'Experience not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch experience' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
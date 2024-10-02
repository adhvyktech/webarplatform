import { saveExperience } from '../../utils/arExperienceStorage';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const experience = await saveExperience(req.body);
      res.status(200).json(experience);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save experience' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
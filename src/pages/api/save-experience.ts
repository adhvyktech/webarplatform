import fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const DATA_FILE = path.join(process.cwd(), 'data', 'arExperiences.json');

interface ARExperience {
  id: string;
  marker_url: string;
  content_url: string;
  scale: number;
  rotation: number;
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, '[]');
  }
}

async function readExperiences(): Promise<ARExperience[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeExperiences(experiences: ARExperience[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(experiences, null, 2));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const experiences = await readExperiences();
      const newExperience: ARExperience = {
        id: Date.now().toString(),
        ...req.body,
      };
      experiences.push(newExperience);
      await writeExperiences(experiences);
      res.status(200).json(newExperience);
    } catch (error) {
      console.error('Error saving AR experience:', error);
      res.status(500).json({ error: 'Failed to save AR experience' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
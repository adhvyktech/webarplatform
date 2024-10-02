import { Handler } from '@netlify/functions';
import fs from 'fs/promises';
import path from 'path';

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

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const experiences = await readExperiences();
    const newExperience: ARExperience = {
      id: Date.now().toString(),
      ...JSON.parse(event.body || '{}'),
    };
    experiences.push(newExperience);
    await writeExperiences(experiences);
    return {
      statusCode: 200,
      body: JSON.stringify(newExperience),
    };
  } catch (error) {
    console.error('Error saving AR experience:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save AR experience' }),
    };
  }
};
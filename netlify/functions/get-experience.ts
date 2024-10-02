import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import * as path from 'path';

const DATA_FILE = path.join('/tmp', 'arExperiences.json');

interface ARExperience {
  id: string;
  marker_url: string;
  content_url: string;
  scale: number;
  rotation: number;
}

async function readExperiences(): Promise<ARExperience[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading experiences:', error);
    return [];
  }
}

export const handler: Handler = async (event) => {
  console.log('Function invoked with event:', JSON.stringify(event));

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const { id } = event.queryStringParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing id parameter' }),
    };
  }

  try {
    const experiences = await readExperiences();
    const experience = experiences.find(exp => exp.id === id);

    if (!experience) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'AR experience not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(experience),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch AR experience', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
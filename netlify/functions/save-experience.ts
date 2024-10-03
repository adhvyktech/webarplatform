import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface ARExperience {
  id: string;
  marker_url: string;
  content_url: string;
  scale: number;
  rotation: number;
}

export const handler: Handler = async (event) => {
  console.log('Function invoked with event:', JSON.stringify(event));

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const store = await getStore('ar-experiences');
    const newExperience: ARExperience = {
      id: Date.now().toString(),
      ...JSON.parse(event.body || '{}'),
    };

    console.log('Attempting to save experience:', JSON.stringify(newExperience));

    await store.set(newExperience.id, JSON.stringify(newExperience));

    console.log('Experience saved successfully');

    return {
      statusCode: 200,
      body: JSON.stringify(newExperience),
    };
  } catch (error) {
    console.error('Error saving AR experience:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to save AR experience', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      }),
    };
  }
};
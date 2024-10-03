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
  console.log('Environment variables:', {
    NETLIFY_BLOBS_SITE_ID: process.env.NETLIFY_BLOBS_SITE_ID ? 'Set' : 'Not set',
    NETLIFY_BLOBS_TOKEN: process.env.NETLIFY_BLOBS_TOKEN ? 'Set' : 'Not set',
  });

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

  if (!process.env.NETLIFY_BLOBS_SITE_ID || !process.env.NETLIFY_BLOBS_TOKEN) {
    console.error('Netlify Blobs environment variables are not set');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server configuration error',
        details: 'Netlify Blobs environment variables are not set'
      }),
    };
  }

  try {
    const store = await getStore('ar-experiences', {
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });

    const experienceData = await store.get(id);

    if (!experienceData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'AR experience not found' }),
      };
    }

    const experience: ARExperience = JSON.parse(experienceData);

    console.log('Experience retrieved successfully:', id);

    return {
      statusCode: 200,
      body: JSON.stringify(experience),
    };
  } catch (error) {
    console.error('Error fetching AR experience:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch AR experience', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      }),
    };
  }
};
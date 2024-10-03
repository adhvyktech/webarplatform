import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

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
    const store = getStore('ar-experiences');
    const experienceData = await store.get(id);

    if (!experienceData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'AR experience not found' }),
      };
    }

    return {
      statusCode: 200,
      body: experienceData,
    };
  } catch (error) {
    console.error('Error fetching AR experience:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch AR experience', details: error instanceof Error ? error.message : 'Unknown error' }),
    };
  }
};
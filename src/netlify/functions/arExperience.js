const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY });

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'POST') {
    const data = JSON.parse(body);
    try {
      const result = await client.query(
        q.Create(q.Collection('ar_experiences'), { data })
      );
      return {
        statusCode: 200,
        body: JSON.stringify({ id: result.ref.id }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  } else if (httpMethod === 'GET') {
    const { id } = event.queryStringParameters;
    try {
      const result = await client.query(
        q.Get(q.Ref(q.Collection('ar_experiences'), id))
      );
      return {
        statusCode: 200,
        body: JSON.stringify(result.data),
      };
    } catch (error) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
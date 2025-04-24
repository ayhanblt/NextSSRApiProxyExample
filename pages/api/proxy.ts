
import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_API = 'https://jsonplaceholder.typicode.com/posts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const response = await fetch(EXTERNAL_API, {
      headers: {
        'Content-Type': 'application/json',
        // Add any required auth headers here
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('External API error');
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}

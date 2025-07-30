export default async function handler(req: any, res: any) {
  const { uuid } = req.query;

  if (!uuid) {
    return res.status(400).json({ error: 'UUID is required' });
  }

  const apiKey = process.env['HYPIXEL_API_KEY'];
  const url = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Hypixel' });
  }
}

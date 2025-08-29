// api/data.js
let data = {
  posts: [],
  social: { telegram: "", whatsapp: "", twitter: "" },
  dematLinks: { zerodha: "", upstox: "", angelone: "", groww: "" },
  stockData: { trending: [], gainers: [], losers: [], news: [] }
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { posts, social, dematLinks, stockData } = req.body;
    if (posts !== undefined) data.posts = posts;
    if (social !== undefined) data.social = social;
    if (dematLinks !== undefined) data.dematLinks = dematLinks;
    if (stockData !== undefined) data.stockData = stockData;
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
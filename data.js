// api/data.js
let data = {};

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    data = req.body;
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
// api/posts.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: "Hello from API!" });
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;
    return res.status(201).json({ title, description });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
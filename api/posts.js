// api/posts.js
let posts = []; // This will store posts temporarily

export default function handler(req, res) {
  // GET: Return all posts
  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  // POST: Add a new post
  if (req.method === 'POST') {
    const { title, description, imageUrl, link } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Create new post
    const newPost = {
      id: Date.now(), // Simple unique ID
      title,
      description,
      imageUrl: imageUrl || "/assets/default.jpg", // Fallback image
      link: link || "#",
      createdAt: new Date().toISOString()
    };

    // Save post
    posts.push(newPost);

    // Return success
    return res.status(201).json(newPost);
  }

  // Handle other methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end('Method Not Allowed');
}
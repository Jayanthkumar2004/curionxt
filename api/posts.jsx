// api/posts.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // GET: Return all posts
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  // POST: Add a new post
  if (req.method === 'POST') {
    const { title, description, imageUrl, link } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newPost = {
      title,
      description,
      imageUrl: imageUrl || "/assets/default.jpg",
      link: link || "#"
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([newPost]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
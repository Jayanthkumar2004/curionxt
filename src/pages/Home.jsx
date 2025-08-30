import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from shared backend
    fetch('/api/posts')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        const formattedPosts = data.map(post => ({
          title: post.title,
          description: post.description,
          img: post.imageUrl,
          link: post.link
        }));
        setPosts(formattedPosts);
      })
      .catch(err => {
        console.error("Failed to load shared posts:", err);
        setPosts([]); // Fallback to empty
      });
  }, []);

  const handleStockClick = () => {
    navigate("/stock-market");
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CURIO_NXT</h2>
        <nav>
          <ul>
            <li>Home</li>
            <li>
              <a href="/admin" className="admin-link">
                Admin Portal
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="social-links">
          <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Featured Section */}
        <section className="featured">
          <img
            src="/assets/featured.jpg"
            alt="Featured Banner"
            className="featured-img"
          />
          <div className="featured-info">
            <h1>Discover Curio_NXT</h1>
            <p>Your one-stop hub for trending posts.</p>

            {/* Professional Stock Market Button */}
            <button className="stock-btn" onClick={handleStockClick}>
              Stock Market
            </button>
          </div>
        </section>

        {/* Posts Section */}
        <section className="popular">
          <h2>Latest Posts</h2>
          <div className="card-grid">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <PostCard
                  key={index}
                  title={post.title}
                  description={post.description}
                  img={post.img}
                  link={post.link}
                />
              ))
            ) : (
              <p className="no-posts">
                No posts found. Publish posts from the Admin Portal!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
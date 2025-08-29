import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shared data from backend
    fetch('/api/data')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        // Ensure data.posts is an array before mapping
        if (Array.isArray(data.posts)) {
          const formattedPosts = data.posts.map(post => ({
            title: post.title,
            description: post.description,
            img: post.imageUrl,
            link: post.link
          }));
          setPosts(formattedPosts);
        } else {
          setPosts([]);
        }
      })
      .catch(err => {
        console.error("Failed to load shared posts:", err);
        setPosts([]); // Fallback if API fails
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
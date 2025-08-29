import React, { useState, useEffect } from "react";
import "./admin.css";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    link: "",
  });

  const [social, setSocial] = useState({
    telegram: "",
    whatsapp: "",
    twitter: "",
  });

  const [dematLinks, setDematLinks] = useState({
    zerodha: "",
    upstox: "",
    angelone: "",
    groww: "",
  });

  const [stockData, setStockData] = useState({
    trending: [],
    gainers: [],
    losers: [],
    news: [],
  });
  const [newStockItem, setNewStockItem] = useState("");
  const [activeSection, setActiveSection] = useState("trending");

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "1234";

  // Load saved data from backend (shared for all users)
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPosts(data.posts || []);
          setSocial(data.social || { telegram: "", whatsapp: "", twitter: "" });
          setDematLinks(data.dematLinks || { zerodha: "", upstox: "", angelone: "", groww: "" });
          setStockData(data.stockData || { trending: [], gainers: [], losers: [], news: [] });
        }
      })
      .catch(err => {
        console.error("Failed to load shared data:", err);
        // Fallback to empty
        setPosts([]);
        setSocial({ telegram: "", whatsapp: "", twitter: "" });
        setDematLinks({ zerodha: "", upstox: "", angelone: "", groww: "" });
        setStockData({ trending: [], gainers: [], losers: [], news: [] });
      });
  }, []);

  // Save all data to backend
  const saveAllData = () => {
    const data = {
      posts,
      social,
      dematLinks,
      stockData
    };

    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error("Save failed:", err));
  };

  const handleSaveSocial = () => {
    saveAllData();
    alert("Social media links saved!");
  };

  const handleSaveDematLinks = () => {
    // Save demat links
    saveAllData();

    // Also save referral links (for frontend use)
    const referralLinks = [
      dematLinks.zerodha ? { name: "Zerodha", link: dematLinks.zerodha } : null,
      dematLinks.upstox ? { name: "Upstox", link: dematLinks.upstox } : null,
      dematLinks.angelone ? { name: "AngelOne", link: dematLinks.angelone } : null,
      dematLinks.groww ? { name: "Groww", link: dematLinks.groww } : null,
    ].filter(Boolean);

    fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(referralLinks)
    }).catch(() => {});

    alert("Demat account links saved!");
  };

  const saveStockData = (updatedData) => {
    setStockData(updatedData);
    // Save to backend
    const data = {
      posts,
      social,
      dematLinks,
      stockData: updatedData
    };

    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});
  };

  const handleAddStockItem = () => {
    if (!newStockItem.trim()) {
      alert("Please enter a value!");
      return;
    }
    const updatedData = {
      ...stockData,
      [activeSection]: [
        ...stockData[activeSection],
        { id: Date.now(), text: newStockItem },
      ],
    };
    saveStockData(updatedData);
    setNewStockItem("");
  };

  const handleDeleteStockItem = (section, id) => {
    const updatedData = {
      ...stockData,
      [section]: stockData[section].filter((item) => item.id !== id),
    };
    saveStockData(updatedData);
  };

  const handleAddOrUpdatePost = () => {
    if (!newPost.title || !newPost.description) {
      alert("Title and Description are required!");
      return;
    }

    let updatedPosts;
    if (editPostId) {
      updatedPosts = posts.map((post) =>
        post.id === editPostId ? { ...post, ...newPost } : post
      );
    } else {
      updatedPosts = [...posts, { id: Date.now(), ...newPost }];
    }

    setPosts(updatedPosts);

    // Save all data
    const data = {
      posts: updatedPosts,
      social,
      dematLinks,
      stockData
    };

    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});

    setNewPost({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      link: "",
    });
    setEditPostId(null);
    alert(editPostId ? "Post updated!" : "Post added!");
  };

  const handleEditPost = (post) => {
    setNewPost(post);
    setEditPostId(post.id);
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);

      const data = {
        posts: updatedPosts,
        social,
        dematLinks,
        stockData
      };

      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});

      alert("Post deleted!");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-container">
      <header className="header">
        <h1 className="title">Admin Portal</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Add/Edit Post */}
      <div className="card">
        <h2>{editPostId ? "Edit Post" : "Add New Post"}</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Post Description"
          value={newPost.description}
          onChange={(e) =>
            setNewPost({ ...newPost, description: e.target.value })
          }
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={newPost.imageUrl}
          onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newPost.videoUrl}
          onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="External Link (Optional)"
          value={newPost.link}
          onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
        />
        <button className="btn-primary" onClick={handleAddOrUpdatePost}>
          {editPostId ? "Update Post" : "Publish Post"}
        </button>
      </div>

      {/* Posts List */}
      <div className="card">
        <h2>Existing Posts</h2>
        {posts.length === 0 ? (
          <p className="empty-text">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-content">
                <strong>{post.title}</strong>
                <p>{post.description}</p>
              </div>
              <div className="post-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stock Market Management */}
      <div className="card">
        <h2>Stock Market Data</h2>
        <div className="tabs">
          {["trending", "gainers", "losers", "news"].map((section) => (
            <button
              key={section}
              className={activeSection === section ? "tab active" : "tab"}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder={`Add to ${activeSection}`}
          value={newStockItem}
          onChange={(e) => setNewStockItem(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAddStockItem}>
          Add
        </button>

        <div className="stock-list">
          {stockData[activeSection].length === 0 ? (
            <p className="empty-text">No items yet.</p>
          ) : (
            stockData[activeSection].map((item) => (
              <div key={item.id} className="post-item">
                <div className="post-content">{item.text}</div>
                <div className="post-actions">
                  <button
                    className="btn-delete"
                    onClick={() =>
                      handleDeleteStockItem(activeSection, item.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="card">
        <h2>Social Media Links</h2>
        <input
          type="text"
          placeholder="Telegram Link"
          value={social.telegram}
          onChange={(e) => setSocial({ ...social, telegram: e.target.value })}
        />
        <input
          type="text"
          placeholder="WhatsApp Link"
          value={social.whatsapp}
          onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })}
        />
        <input
          type="text"
          placeholder="Twitter Link"
          value={social.twitter}
          onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
        />
        <button className="btn-primary" onClick={handleSaveSocial}>
          Save Links
        </button>
      </div>

      {/* Demat Account Links */}
      <div className="card">
        <h2>Demat Account Links</h2>
        <input
          type="text"
          placeholder="Zerodha Link"
          value={dematLinks.zerodha}
          onChange={(e) =>
            setDematLinks({ ...dematLinks, zerodha: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Upstox Link"
          value={dematLinks.upstox}
          onChange={(e) =>
            setDematLinks({ ...dematLinks, upstox: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="AngelOne Link"
          value={dematLinks.angelone}
          onChange={(e) =>
            setDematLinks({ ...dematLinks, angelone: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Groww Link"
          value={dematLinks.groww}
          onChange={(e) =>
            setDematLinks({ ...dematLinks, groww: e.target.value })
          }
        />
        <button className="btn-primary" onClick={handleSaveDematLinks}>
          Save Demat Links
        </button>
      </div>
    </div>
  );
}
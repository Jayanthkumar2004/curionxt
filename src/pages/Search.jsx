import React from "react";
import { useLocation } from "react-router-dom";
import postsData from "../data/articles"; // Your news articles data file

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  // Filter posts where title or description matches query
  const filteredPosts = postsData.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for: <span style={{ color: "#0077ff" }}>{query}</span></h2>
      
      {filteredPosts.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9f9f9",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 8px" }}>{post.title}</h3>
                <p style={{ margin: "0 0 10px", color: "#555" }}>
                  {post.description}
                </p>
                <a href={post.link} target="_blank" rel="noreferrer" style={{ color: "#0077ff" }}>
                  Read more
                </a>
              </div>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100px", height: "70px", objectFit: "cover", borderRadius: "5px" }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "#777" }}>No results found.</p>
      )}
    </div>
  );
}

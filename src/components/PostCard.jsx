import React from "react";
import "./PostCard.css";

export default function PostCard({ title, description, img, link }) {
  return (
    <div className="post-card">
      {img && <img src={img} alt={title} className="post-img" />}
      <div className="post-info">
        <h3 className="post-title">{title}</h3>
        <p className="post-description">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="visit-link"
          >
            Visit Link
          </a>
        )}
      </div>
    </div>
  );
}

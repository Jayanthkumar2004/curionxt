import React from "react";

export default function NewsItem({ item }) {
  return (
    <li className="news-item">
      <h4>{item.title || "News Title"}</h4>
      <p>{item.description || "News description..."}</p>
    </li>
  );
}

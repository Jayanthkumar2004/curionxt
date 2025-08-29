import React from "react";

export default function TrendingCard({ stock }) {
  return (
    <div className="trending-card">
      <h3>{stock.title || "Trending Stock"}</h3>
      <p>{stock.description || "Trending details..."}</p>
    </div>
  );
}

import React from "react";

export default function StockCard({ stock }) {
  return (
    <div className="stock-card">
      <h3>{stock.title || "Stock Name"}</h3>
      <p>{stock.description || "Stock details here..."}</p>
    </div>
  );
}

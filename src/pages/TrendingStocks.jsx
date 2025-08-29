import React, { useEffect, useState } from "react";
import "./StockMarket.css";

export default function TrendingStocks() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const savedStock =
      JSON.parse(localStorage.getItem("stockMarketData")) || { trending: [] };
    setTrending(savedStock.trending || []);
  }, []);

  return (
    <div className="page-container">
      <h1>Trending Stocks</h1>
      {trending.length > 0 ? (
        trending.map((item, idx) => (
          <div key={idx} className="item-card">
            <p>{item.text || item.title}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">No trending data yet.</p>
      )}
    </div>
  );
}

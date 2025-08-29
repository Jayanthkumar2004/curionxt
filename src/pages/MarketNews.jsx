import React, { useEffect, useState } from "react";
import "./StockMarket.css";

export default function MarketNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const savedStock =
      JSON.parse(localStorage.getItem("stockMarketData")) || { news: [] };
    setNews(savedStock.news || []);
  }, []);

  return (
    <div className="page-container">
      <h1>Market News</h1>
      {news.length > 0 ? (
        news.map((item, idx) => (
          <div key={idx} className="item-card">
            <p>{item.text || item.title}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">No market news yet.</p>
      )}
    </div>
  );
}

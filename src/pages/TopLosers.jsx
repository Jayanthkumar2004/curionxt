import React, { useEffect, useState } from "react";
import "./StockMarket.css";

export default function TopLosers() {
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const savedStock =
      JSON.parse(localStorage.getItem("stockMarketData")) || { losers: [] };
    setLosers(savedStock.losers || []);
  }, []);

  return (
    <div className="page-container">
      <h1>Top Losers</h1>
      {losers.length > 0 ? (
        losers.map((item, idx) => (
          <div key={idx} className="item-card">
            <p>{item.text || item.title}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">No losers data yet.</p>
      )}
    </div>
  );
}

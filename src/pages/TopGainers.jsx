import React, { useEffect, useState } from "react";
import "./StockMarket.css";

export default function TopGainers() {
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    const savedStock =
      JSON.parse(localStorage.getItem("stockMarketData")) || { gainers: [] };
    setGainers(savedStock.gainers || []);
  }, []);

  return (
    <div className="page-container">
      <h1>Top Gainers</h1>
      {gainers.length > 0 ? (
        gainers.map((item, idx) => (
          <div key={idx} className="item-card">
            <p>{item.text || item.title}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">No gainers data yet.</p>
      )}
    </div>
  );
}

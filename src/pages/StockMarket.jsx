import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockMarket.css";

export default function StockMarket() {
  const [referralLinks, setReferralLinks] = useState([]);
  const navigate = useNavigate();

  // Load referral links from localStorage
  useEffect(() => {
    const savedReferrals =
      JSON.parse(localStorage.getItem("referralLinks")) || [];
    setReferralLinks(savedReferrals);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Stock Market Dashboard</h1>

      {/* Navigation Buttons */}
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/trending")}>Trending Stocks</button>
        <button onClick={() => navigate("/gainers")}>Top Gainers</button>
        <button onClick={() => navigate("/losers")}>Top Losers</button>
        <button onClick={() => navigate("/news")}>Market News</button>
      </div>

      {/* Referral Links */}
      <div className="referral-card">
        <h2>Open Your Free Demat Account</h2>
        <div className="referral-links">
          {referralLinks.length > 0 ? (
            referralLinks.map((ref, idx) => (
              <a
                key={idx}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ref.name}
              </a>
            ))
          ) : (
            <p className="empty-text">
              No referral links added. Please check with admin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

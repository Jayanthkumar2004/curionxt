import React from "react";
import { Link } from "react-router-dom";

export default function StockSidebar() {
  return (
    <aside className="stock-sidebar">
      <h2>Stock Menu</h2>
      <ul>
        <li><Link to="/stock-market">Dashboard</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/">Home</Link></li>
      </ul>
    </aside>
  );
}

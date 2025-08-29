import React, { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [links, setLinks] = useState({
    telegram: "#",
    whatsapp: "#",
    twitter: "#",
  });

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("socialLinks"));
    if (savedLinks) {
      setLinks(savedLinks);
    }
  }, []);

  return (
    <footer className="footer">
      <p>© 2025 CURIO_NXT. All Rights Reserved.</p>
      <div className="social-links">
        <a href={links.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={links.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
}

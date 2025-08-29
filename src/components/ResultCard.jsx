import React from "react";

export default function ResultCard({ title, description, image, link }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <a
          href={link}
          className="inline-block mt-4 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}

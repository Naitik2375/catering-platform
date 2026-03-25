"use client";

import { useEffect, useState } from "react";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/caterers")
      .then((res) => res.json())
      .then((data) => setCaterers(data));
  }, []);

  // filtering logic
  const filteredCaterers = caterers.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (maxPrice === "" || c.pricePerPlate <= maxPrice)
    );
  });

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold text-center mb-6">
      Caterers List
    </h1>

    {/* Search + Filter */}
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name..."
        className="flex-1 p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max price (₹)"
        className="flex-1 p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    {/* Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCaterers.length > 0 ? (
        filteredCaterers.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5"
          >
            <h2 className="text-xl font-semibold mb-2">{c.name}</h2>

            <p className="text-gray-600 text-sm mb-1">
              📍 {c.location}
            </p>

            <p className="text-green-600 font-medium mb-1">
              ₹{c.pricePerPlate} per plate
            </p>

            <p className="text-sm text-gray-700 mb-2">
              🍽 {c.cuisines.join(", ")}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-yellow-500 font-semibold">
                ⭐ {c.rating}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No caterers found
        </p>
      )}
    </div>
  </div>
);
}
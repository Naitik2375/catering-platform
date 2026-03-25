"use client";

import { useEffect, useState } from "react";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/caterers")
      .then((res) => res.json())
      .then((data) => setCaterers(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Caterers</h1>

      {caterers.map((c) => (
        <div key={c.id} className="border p-4 mb-3 rounded">
          <h2 className="text-xl font-semibold">{c.name}</h2>
          <p>Location: {c.location}</p>
          <p>Price: ₹{c.pricePerPlate}</p>
          <p>Cuisines: {c.cuisines.join(", ")}</p>
          <p>Rating: {c.rating}</p>
        </div>
      ))}
    </div>
  );
}
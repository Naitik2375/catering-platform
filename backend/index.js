const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/caterers", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

app.get("/api/caterers/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const id = parseInt(req.params.id);

  const caterer = data.find((c) => c.id === id);

  if (!caterer) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(caterer);
});

app.post("/api/caterers", (req, res) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  // validation
  if (!name || !location || !pricePerPlate || !cuisines || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = JSON.parse(fs.readFileSync("data.json"));

  const newCaterer = {
    id: data.length + 1,
    name,
    location,
    pricePerPlate,
    cuisines,
    rating,
  };

  data.push(newCaterer);

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  res.status(201).json(newCaterer);
});
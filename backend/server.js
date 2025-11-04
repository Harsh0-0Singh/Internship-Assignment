import express from "express";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import db from "./db.js";

const app = express();

app.use(
  cors({
    origin: "https://internship-assignment-6l26.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "schoolImages",
    allowed_formats: ["jpg", "jpeg", "png", "webp","avif"],
  },
});
const upload = multer({ storage });

// Routes

// Add a school
app.post("/api/schools", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file received" });
    }
    const { name, address, city, state, contact, email } = req.body;
     if (!name || !address || !city || !state || !contact || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const image = req.file ? req.file.path : null;
   
    const sql =
      "INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(sql, [name, address, city, state, contact, email, image]);
    return res.json({ message: "School added successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// Fetch all schools
app.get("/api/schools", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM schools");
    res.json(rows);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

export default app;

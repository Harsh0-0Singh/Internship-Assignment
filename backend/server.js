import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();

// cors setup
app.use(
  cors({
    origin: "https://internship-assignment-6l26.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// MySQL setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "schoolImages", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// controllers
app.post("/api/schools", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email } = req.body;
    const image = req.file ? req.file.path : null;

    const sql =
      "INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(sql, [name, address, city, state, contact, email, image]);

    res.json({ message: "School added successfully", imageUrl: image });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database insertion failed" });
  }
});


app.get("/api/schools", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM schools");
    res.json(rows);
  } catch (err) {
    console.error(" Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});


export default app;

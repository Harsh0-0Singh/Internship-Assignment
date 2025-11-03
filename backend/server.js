import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();
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

app.post("/api/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email } = req.body;
  const image = req.file ? req.file.path : null; // Cloudinary URL
console.log("Data here", name, address, city, state, contact, email,image)
  const sql =
    "INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, address, city, state, contact, email, image], (err) => {
    if (err) {
      console.error("Database error:",err.sqlMessage || err.message);
     return res.status(500).json({ error: err.sqlMessage || "Database insertion failed" });
    }
    res.json({ message: "School added successfully", imageUrl: image });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));


// Get all schools
app.get("/api/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results);
  });
});

export default app;

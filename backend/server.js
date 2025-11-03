import express from "express";
import cors from "cors";
import multer from "multer";
import db from "./db.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/schoolImages', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add new school
app.post("/api/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email } = req.body;
  const image = req.file ? `/schoolImages/${req.file.filename}` : null;
  const sql = "INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, email, image], err => {
    if (err) return res.json({ error: err });
    res.json({ message: "School added successfully" });
  });
});

// Get all schools
app.get("/api/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));

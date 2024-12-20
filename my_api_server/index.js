const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const path = require('path');

const app = express();
const port = 8080;

// Kết nối với MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Tên người dùng MySQL
  password: "", // Mật khẩu MySQL
  database: "api", // Tên cơ sở dữ liệu
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database.");
});
app.use(cors({
  origin: '*'  
}));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Định nghĩa API endpoint
app.get("/api/v1/customers", (req, res) => {
  db.query("SELECT * FROM customer LIMIT 10", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ data: { customers: results } });
  });
});
app.get("/api/v1/products", (req, res) => {
  db.query("SELECT * FROM products LIMIT 10", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log("Products fetched:", results); 
    res.json({ data: { products: results } });
  });
});

// Lắng nghe yêu cầu HTTP
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});

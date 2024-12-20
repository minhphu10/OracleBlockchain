const express = require("express");
const helmet = require("helmet");
const path = require("path");
// const cors = require("cors");

const app = express();

// Thêm CSP và CORS
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "https://cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "http://localhost:8080"],
        "connect-src": ["http://localhost:8080", "http://127.0.0.1:8545"],
      },
    },
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:9999",
//   })
// );

// Phục vụ các file tĩnh từ thư mục `public`
app.use(express.static(path.join(__dirname, "public")));

// Điểm truy cập chính
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(9999, () => console.log("Server running at http://localhost:9999"));

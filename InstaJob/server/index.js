const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect_db = require("./server");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/jobs/", require("./src/routes/JobRoute"));
app.use("/api/auth/", require("./src/routes/AuthRoute"));
app.use("/api/applications/", require("./src/routes/ApplicationRoute"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-url.vercel.app"
    ],
    credentials: true
  })
);

app.listen(PORT, async () => {
  await connect_db();
  console.log(`Server running at port ${PORT}`);
});

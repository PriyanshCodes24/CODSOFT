const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect_db = require("./server");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/jobs/", require("./src/routes/JobRoute"));
app.use("/api/auth/", require("./src/routes/AuthRoute"));

app.listen(PORT, async () => {
  await connect_db();
  console.log(`Server running at port ${PORT}`);
});

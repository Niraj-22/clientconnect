const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/data");
const connectMongodb = require("./init/mongodb");
dotenv.config();
connectMongodb();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/data", dataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

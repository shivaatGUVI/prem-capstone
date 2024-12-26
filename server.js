const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "upload")));

const products = require("./routes/product");
const users = require("./routes/user");
const orders = require("./routes/order");
const restarunt = require("./routes/restarunt");
const kitchen = require("./routes/kitchen");
const payment = require("./routes/payment");

app.use("/api/v1/", products);
app.use("/api/v1", orders);
app.use("/api/v1/", users);
app.use("/api/v1/", restarunt);
app.use("/api/v1/", kitchen);
app.use("/api/v1/", payment);

app.listen(process.env.PORT, async () => {
  try {
    await connectDatabase;
    console.log(
      `Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`
    );
  } catch (err) {
    console.log(err);
  }
});

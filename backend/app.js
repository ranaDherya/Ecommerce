const express = require("express");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: path.resolve(__dirname, "./config/config.env"),
//   });
// }

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());
app.use(cors());
// app.use(express.static(path.join(__dirname, "../frontend/public")));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"));
// });

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;

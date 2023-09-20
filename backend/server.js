const app = require("./app");
const path = require("path");
const cloudinary = require("cloudinary");
const connectDatabase = require("./db/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Error: ", err.message);
  console.log("Shutting down due to Uncaught Exception");

  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: path.resolve(__dirname, "./config/config.env"),
//   });
// }
// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is running on: http://localhost:${process.env.PORT}`)
);

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  console.log("Shutting down due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});

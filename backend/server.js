const app = require("./app");
const path = require("path");

const dotenv = require("dotenv");
const connectDatabase = require("./db/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Error: ", err.message);
  console.log("Shutting down due to Uncaught Exception");

  process.exit(1);
});

// config
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// Connecting to database
connectDatabase();

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

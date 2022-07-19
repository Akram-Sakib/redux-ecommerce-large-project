const app = require("./app");
const databaseConnected = require("./config/database");
const cloudinary = require("cloudinary");

//config
///handling uncaught exception
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  process.exit(1);
});

//connect database
databaseConnected();
///cloudinary-config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
///
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`http://localhost:${process.env.PORT || 5000}`);
});

////unhandle-rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

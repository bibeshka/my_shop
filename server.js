const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

//connect storage modules

// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const methodOverride = require("method-override");

// app.use(methodOverride("_method"));

// const fileUpload = require('express-fileupload');

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
//Display requsts in console
app.use(morgan("common"));
//Secure express app
app.use(helmet());
//Connect CORS Policy
app.use(cors());

app.use(express.json());
// app.use(fileUpload())

//modules
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const adminsRouter = require("./routes/admins");

const fileRouter = require("./routes/fileUpload");

app.use(productsRouter);
app.use(ordersRouter);
app.use(adminsRouter);

app.use(fileRouter);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "prodaction") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Error handlers
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env === "production" ? "Error" : error.stack,
  });
});

//Server run
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

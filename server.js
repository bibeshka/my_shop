const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const cors = require('cors');

// const fileUpload = require('express-fileupload');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(fileUpload())

//modules
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const adminsRouter = require('./routes/admins');

app.use(productsRouter);
app.use(ordersRouter);
app.use(adminsRouter);

//modules

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
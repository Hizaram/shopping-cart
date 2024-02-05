// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/dbase');
const AuthController = require('./controllers/authController');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const customerRouter = require('./routes/customerRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Use protected routes for product
app.use(['/products', '/products/:id'], AuthController.protect, productRouter);

// Use auth router
app.use('/auth', authRouter);

// Use customer router
app.use('/customers', customerRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

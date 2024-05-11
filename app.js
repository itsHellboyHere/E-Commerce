require('dotenv').config();
require('express-async-errors')
//express
const express = require('express')
const app = express();
const path = require('path');
//rest of the packages

// const morgan =require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')

//database 
const connectDB = require('./db/connect');
//roters 
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require("./routes/productRoutes");
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require("./middleware/error-handler");


app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
}))
// app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "https://js.stripe.com", "http://localhost:5173", "*"],
    scriptSrc: ["'self'", "https://js.stripe.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "*"],
    imgSrc: ["'self'", "*", "data:", "https://plushheaven.onrender.com"], // Add the img-src directive
    // Add more directives as needed based on the application's requirements
  }

}));





app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(xss())
app.use(mongoSanitize())

// app.use(morgan('tiny'))
app.use(express.json()); //middleware to parse json data from request body
app.use(cookieParser(process.env.JWT_SECRET)) // middleware for parsing cookies

// app.use(express.static(path.join(__dirname, 'public', 'dist')));


app.use(express.static('./public'))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to set MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});


//routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);


// redirects
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);




const port = process.env.PORT || 5000;
const start = async () => {
  try {

    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
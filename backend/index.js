const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//routes
const authRouter= require('./routes/auth.routes.js')
const contactRoute=require('./routes/contact.routes.js')
const productRouter =require('./routes/product.routes.js')
const orderRouter =require('./routes/order.routes.js')
dotenv.config();

//middleware used
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());

//routes middleware
app.use('/auth',authRouter)
app.use('/contact',contactRoute)
app.use('/api/products',productRouter)
app.use('/order',orderRouter)

app.get('/', (req, res) => {
  res.send('<h1>Backend running on 5000</h1>');
});

const PORT = process.env.PORT || 5000;
connectDB()
.then(()=>{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err)=>{
  console.log(`Server connection failed ${err}`)
})
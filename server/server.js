import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
app.use(async (req, res, next) => {
  await connectDB();
  next();
});



const allowedOrigins = ['http://localhost:5173']


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


// API Endpoints
app.get('/', (req, res) => {res.send(' API working');});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


{/*  for local host not for serverless connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/}


//for serverless connection instead of using app.listen use this one
export default app;

    
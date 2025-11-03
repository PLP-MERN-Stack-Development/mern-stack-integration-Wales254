import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/mern_blog';

console.log("🔍 Using Mongo URI:", MONGO);
mongoose.connect(MONGO).then(()=>console.log('✅ MongoDB Connected Successfully')).catch(e=>console.error('❌',e.message));

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req,res)=>res.send('MERN Blog API'));

app.listen(PORT, ()=>console.log('Server listening on', PORT));

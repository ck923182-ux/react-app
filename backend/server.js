import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/categories.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'))
);
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend server is running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

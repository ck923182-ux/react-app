import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Category from './models/Category.js';
import Post from './models/Post.js';

dotenv.config();

const seed = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogapp';
    await mongoose.connect(mongoURI);

    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});

    // Hash passwords before inserting users
    const saltRounds = 10;
    const usersData = [
      { name: 'Avery Stone', email: 'admin@gmail.com', role: 'admin', password: 'admin123' },
      { name: 'Jordan Lee', email: 'jordan@example.com', password: 'password123' },
      { name: 'Mila Chen', email: 'mila@example.com', password: 'password123' }
    ];

    // Hash each password
    const hashedUsers = await Promise.all(
      usersData.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds)
      }))
    );

    const users = await User.insertMany(hashedUsers);

    const categories = await Category.insertMany([
      { name: 'Technology', description: 'Tech and innovation' },
      { name: 'Lifestyle', description: 'Daily life and productivity' },
      { name: 'Business', description: 'Work and growth' }
    ]);

    await Post.insertMany([
      {
        title: '10 ideas for a productive morning routine',
        content: 'A short guide to building a strong morning habit.',
        author: users[0]._id,
        authorName: users[0].name,
        category: 'Lifestyle',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Why storytelling matters in modern branding',
        content: 'How stories help businesses connect with customers.',
        author: users[1]._id,
        authorName: users[1].name,
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'A beginner guide to mindful living',
        content: 'Simple tips to feel calmer and more grounded.',
        author: users[2]._id,
        authorName: users[2].name,
        category: 'Lifestyle',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
      }
    ]);

    console.log('Seed data inserted successfully!');
    console.log('Test credentials:');
    console.log('Admin: admin@gmail.com / admin123');
    console.log('User: jordan@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();

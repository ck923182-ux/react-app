import express from 'express';
import multer from 'multer';
import path from 'path';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET all posts - Public access
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
});

// GET single post by ID - Public access
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch post' });
  }
});

// CREATE new post - Protected (any authenticated user)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.user._id,
      authorName: req.user.name,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    const savedPost = await post.save();
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE post - Protected (only author or admin)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this post' });
    }

    const { title, content, category } = req.body;
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE post - Protected (only author or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete post' });
  }
});

export default router;

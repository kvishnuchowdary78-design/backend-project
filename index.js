require('dotenv').config();

const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Post = require('./models/Post');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// -------------------- BASIC --------------------
app.get('/', (req, res) => {
  res.send('Server Running');
});

// -------------------- REGISTER --------------------
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------- LOGIN --------------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      "my_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- CREATE POST --------------------
app.post('/api/posts', auth, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    const post = await newPost.save();
    res.json(post);

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// -------------------- GET POSTS (POPULATE) --------------------
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', ['username', 'email']);

    res.json(posts);

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// -------------------- SERVER --------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const express = require('express');
const cors = require('cors');

const app = express();

//Import Routes
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const postRoutes = require('./router/post');
const bookmarkRoutes = require('./router/bookmark');

//Configure Body Parser
app.use(express.json());

// Configurar cookie-parser

//Configure CORS
app.use(cors());

//Configure Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', bookmarkRoutes);

module.exports = app;

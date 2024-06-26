const express = require('express');
const cors = require('cors');

//Import Routes
const authRoutes = require('./router/auth.router');
const userRoutes = require('./router/user.router');
const postRoutes = require('./router/post.router');
const bookmarkRoutes = require('./router/bookmark.router');

const app = express();

//Configure Body Parser
app.use(express.json());

//Configure CORS
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello Koders');
});

//Configure Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', bookmarkRoutes);

module.exports = app;

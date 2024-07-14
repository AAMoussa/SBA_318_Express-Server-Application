const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Custom Middleware
const authMiddleware = require('./middleware/authMiddleware');
const loggingMiddleware = require('./middleware/loggingMiddleware');
app.use(authMiddleware);
app.use(loggingMiddleware);

// Routs
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

// Error handling middleware
app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

// Start server OR make the server listen on the designated port and log the message on the screen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

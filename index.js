const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const PORT = 3000;
const indexRouter = require('./routes/user-routes');
const managerRouter = require('./routes/department-routes');

// Use JSON parsing middleware
app.use(express.json());

app.use(session({ secret: 'testing', resave: false, saveUninitialized: true, cookie: { secure: true } }));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// MongoDB Atlas connection string (replace with your actual connection string)
const mongoDBURI = 'mongodb+srv://sakshit:Testing123@cluster0.dyf85ax.mongodb.net/Task?retryWrites=true&w=majority';


// Connect to MongoDB
mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Once connected to MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Use URL-encoded parsing middleware
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/task', function (req, res, next) {
    res.send('Welcome to Task demo');
});

app.use('/api/v1', indexRouter);                
app.use('/api/managers', managerRouter);                

// 404 route (for routes that don't match any defined route)
app.use((req, res) => {
    res.status(404).send('404 Page Not Found');
});

module.exports = app;
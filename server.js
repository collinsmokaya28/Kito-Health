const express = require('express');
const path = require('path'); // Module to work with file paths
const app = express();
const mongoose = require('mongoose');
const routes = require('./src/routes');
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB URI
const server = 'mongodb://localhost:27017/interviewProject';
mongoose.set('strictQuery', true);

app.use('/', routes);

mongoose.connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`API listening on http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error('Database connection failed:', err);
});

// Route to serve the questionnaire HTML page
app.get('/questionnaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/questionnaire.html'));
});

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).send({
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'An internal server error occurred',
    });
});



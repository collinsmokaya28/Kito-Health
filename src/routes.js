const express = require('express');
const Questionnaire = require('./modelQuestionnaire'); // New Questionnaire model
const path = require('path');

const router = express.Router();

// Serve the HTML file for the root route
router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        res.status(500).json({ message: 'Error loading page' });
    }
});

// Route to create a new questionnaire
router.post('/questionnaire', async (req, res) => {
    const { title, questions } = req.body;

    // Validate the incoming data
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid request. A title and questions are required.' });
    }

    try {
        // Create a new questionnaire document
        const newQuestionnaire = new Questionnaire({
            title: title,
            questions: questions.map((question) => ({
                questionText: question.questionText,
                answers: question.answers.map((answer) => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                    weight: answer.weight,
                })),
            })),
        });

        // Save the questionnaire
        const result = await newQuestionnaire.save();

        // Return the created questionnaire
        res.status(201).json({ message: 'Questionnaire created successfully', questionnaire: result });
    } catch (error) {
        console.error('Error creating questionnaire:', error);
        res.status(500).json({ message: 'An error occurred while creating the questionnaire.' });
    }
});

module.exports = router;


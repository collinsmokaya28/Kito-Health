const express = require('express');
const Questionnaire = require('./models/Questionnaire'); 
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

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid request. A title and questions are required.' });
    }

    try {
        const newQuestionnaire = new Questionnaire({
            title: title,
            questions: questions.map((question) => ({
                questionText: question.questionText,
                answers: question.answers.map((answer) => ({
                    answerText: answer.answerText,
                    weight: answer.weight,
                    isCorrect: answer.isCorrect,
                })),
            })),
        });

        const result = await newQuestionnaire.save();
        res.status(201).json({ message: 'Questionnaire created successfully', questionnaire: result });
    } catch (error) {
        console.error('Error creating questionnaire:', error);
        res.status(500).json({ message: 'An error occurred while creating the questionnaire.' });
    }
});

// Route to render the questionnaire form
router.get('/questionnaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'questionnaire.html'));
});

// Route to handle the questionnaire form submission and calculate results
router.post('/submit-questionnaire', async (req, res) => {
    const { questions } = req.body;

    let totalScore = 0;

    for (const question of questions) {
        const selectedAnswerIndex = question.correctAnswer; // Get the selected answer index
        const selectedAnswer = question.answers[selectedAnswerIndex];

        if (selectedAnswer) {
            totalScore += selectedAnswer.weight; // Add the weight of the selected answer
        }
    }

    // Render a results page or send a response with the score
    res.send(`Your total score is: ${totalScore}`);
});

module.exports = router;


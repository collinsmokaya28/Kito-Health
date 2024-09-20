const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the questionnaire
const questionnaireSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      answers: [
        {
          answerText: { type: String, required: true },
          weight: { type: Number, enum: [1, 2, 3], required: true }, // 3 weight values
          isCorrect: { type: Boolean, default: false }, // Mark if this is the correct answer
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;

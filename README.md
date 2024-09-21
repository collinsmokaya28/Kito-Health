# Questionnaire App

This is a simple **Questionnaire App** built using **Node.js**, **Express**, and **MongoDB**. The application allows users to create questionnaires with multiple questions and answers. Each question can have multiple answers with corresponding weights, and users can dynamically add or remove questions and answers.

## Features

- **Dynamic Questionnaire Creation**: Users can add multiple questions, each with multiple answers, dynamically without reloading the page.
- **Questionnaire Storage**: All created questionnaires are stored in a MongoDB database.
- **Weight-Based Results**: Each answer has an associated weight, and results can be calculated based on the selected answers.
- **Form Validation**: Ensures that users input valid questions, answers, and weights before submission.
- **Responsive Design**: The app is designed to be responsive and works well on various screen sizes.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB for storing questionnaire data
- **Templating**: Vanilla HTML and CSS for rendering the UI

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **MongoDB** (local instance or cloud-based)
- **Git** (optional, for version control)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/questionnaire-app.git

2. Navigate into the project directory:
   ```bash
   cd questionnaire-app
   
3. Install the required dependencies:
   ```
   npm install

4. Set up environment variables: Create a .env file in the root directory with the following variables:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/questionnaire_db
   PORT=3000

5. Start the app:
   ```bash
   npm start

7. Open the app in your browser at http://localhost:3000.
   

## API Endpoints

GET /: Serves the main HTML page to create questionnaires.

POST /questionnaire: Creates a new questionnaire and stores it in the database.

POST /submit-questionnaire: Handles form submission and validates inputs.

### Sample API Request

To create a new questionnaire, you can send a POST request to /questionnaire with the following JSON structure:
```
  {
    "title": "Sample Questionnaire",
    "questions": [
        {
            "questionText": "What is your favorite color?",
            "answers": [
                { "text": "Red", "weight": 1, "isCorrect": true },
                { "text": "Blue", "weight": 2, "isCorrect": false },
                { "text": "Green", "weight": 3, "isCorrect": false }
            ]
        }
    ]
}
```


## Usage
1. Navigate to http://localhost:3000 in your browser.

2. Enter a title for the questionnaire.

3. Add a question and its corresponding answers.

4. Add more answers or questions dynamically using the buttons.

5. Submit the questionnaire when you're done.

6. The data is saved in MongoDB and will be available for further use (e.g., for calculating results).

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request. Make sure your changes follow best practices, and provide a clear description of the changes you've made.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.



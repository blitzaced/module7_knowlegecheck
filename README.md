# 🎯 Trivia Quiz App

This is a mini quiz application built using **React** and **Vite**, fetching trivia questions from the [Open Trivia Database API](https://opentdb.com/).

## 📚 Features

- Welcome screen with form to input:
  - First Name
  - Category (4 selectable)
  - Difficulty (Easy, Medium, Hard)
- Fetches 10 questions via the Open Trivia API
- Displays one random multiple-choice question
- Results section shows correctness and the correct answer
- Option to reset and take another quiz

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

```bash
git clone https://github.com/your-username/trivia-quiz-app.git
cd trivia-quiz-app
npm install
Start Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:5173 in your browser.

🧠 API Usage
The app uses this endpoint:

bash
Copy
Edit
https://opentdb.com/api.php?amount=10&type=multiple&category={CATEGORY_ID}&difficulty={DIFFICULTY}
One question is randomly selected from the result.

Answers are shuffled before display.

🗂 Project Structure
App.jsx: Main logic for stage transitions and form handling

QuestionForm.jsx: Displays the current question and answers

ResultsSection.jsx: Shows result message and reset button

🖼 Screens
Home: User enters details to start

Quiz: One multiple choice question

Results: Answer correctness and reset option

🧪 Tech Stack
React (with Hooks)

Vite

Tailwind CSS (optional if used)

Open Trivia API

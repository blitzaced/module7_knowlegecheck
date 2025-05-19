import { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [formData, setFormData] = useState({ name: "", category: "", difficulty: "" });
  const [stage, setStage] = useState("home");
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const [formInputs, setFormInputs] = useState({ name: "", category: "", difficulty: "" });
  const [formError, setFormError] = useState("");

  const categories = [
    { label: "General Knowledge", value: "9" },
    { label: "Science & Nature", value: "17" },
    { label: "History", value: "23" },
    { label: "Sports", value: "21" }
  ];

  const difficulties = ["easy", "medium", "hard"];

  const handleInputChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formInputs.name || !formInputs.category || !formInputs.difficulty) {
      setFormError("All fields are required.");
      return;
    }
    setFormError("");
    setFormData(formInputs);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${formInputs.category}&difficulty=${formInputs.difficulty}`
      );
      const json = await response.json();
      if (json.response_code !== 0 || json.results.length === 0) throw new Error("Invalid API response");
      const question = json.results[0];
      const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
      setQuestionData({ ...question, answers });
      setStage("question");
    } catch (error) {
      setApiError("Failed to fetch question. Please try again.");
    }
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === questionData.correct_answer;
    setResult({ isCorrect });
    setStage("result");
  };

  const resetQuiz = () => {
    setFormInputs({ name: "", category: "", difficulty: "" });
    setFormData({ name: "", category: "", difficulty: "" });
    setQuestionData(null);
    setSelectedAnswer("");
    setResult(null);
    setApiError(null);
    setFormError("");
    setStage("home");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 font-sans">
      {stage === "home" && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">Welcome to the Quiz!</h1>
          <p className="mb-4 text-gray-600">Fill out the form below to start your quiz.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">First Name:</label>
              <input
                type="text"
                name="name"
                value={formInputs.name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Category:</label>
              <select
                name="category"
                value={formInputs.category}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select a Category --</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Difficulty:</label>
              <select
                name="difficulty"
                value={formInputs.difficulty}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select Difficulty --</option>
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {formError && <p className="text-red-500 mb-2">{formError}</p>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Start Quiz
            </button>
          </form>
        </div>
      )}
      {stage === "question" && (
        <QuestionForm
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          onSubmit={submitAnswer}
          apiError={apiError}
        />
      )}
      {stage === "result" && (
        <ResultsSection
          name={formData.name}
          isCorrect={result.isCorrect}
          correctAnswer={questionData.correct_answer}
          onReset={resetQuiz}
        />
      )}
    </div>
  );
}

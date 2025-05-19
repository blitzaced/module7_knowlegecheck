const QuestionForm = ({
  questionData,
  selectedAnswer,
  setSelectedAnswer,
  onSubmit,
  apiError
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) return;
    onSubmit();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Question</h2>
      {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
      <form onSubmit={handleSubmit}>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: questionData.question }} />
        <div className="mb-4 space-y-2">
          {questionData.answers.map((answer, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </label>
          ))}
        </div>
        {!selectedAnswer && <p className="text-red-500 mb-2">Please select an answer.</p>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;

const ResultsSection = ({ name, isCorrect, correctAnswer, onReset }) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p className="mb-2">
        {isCorrect ? `Well done, ${name}! You got it right! 🎉` : `Sorry, ${name}. That's incorrect.`}
      </p>
      {!isCorrect && (
        <p className="mb-4">
          The correct answer was:{" "}
          <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} />
        </p>
      )}
      <button onClick={onReset} className="bg-blue-600 text-white px-4 py-2 rounded">
        Try Another Question
      </button>
    </div>
  );
};

export default ResultsSection;

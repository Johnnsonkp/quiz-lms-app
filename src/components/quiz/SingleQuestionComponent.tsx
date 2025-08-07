import { useState, useEffect } from 'react';
import { Question, Subject } from '../../types';

interface SingleQuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
  questionNumber: number;
  totalQuestions: number;
}

function SingleQuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult,
  questionNumber,
  totalQuestions 
}: SingleQuestionCardProps) {
  // Combine correct answer with incorrect answers and shuffle
  const allAnswers = [question.answer, ...(question.incorrect_answers || [])];
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answers when component mounts or question changes
    const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [question.id]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-blue-600 font-medium">ID: {question.id}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrectAnswer = answer === question.answer;
          
          let buttonClass = "w-full p-4 text-left border rounded-lg transition-all duration-200 ";
          
          if (showResult) {
            if (isCorrectAnswer) {
              buttonClass += "bg-green-50 border-green-400 text-green-800 ring-2 ring-green-200";
            } else if (isSelected && !isCorrectAnswer) {
              buttonClass += "bg-red-50 border-red-400 text-red-800 ring-2 ring-red-200";
            } else {
              buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
            }
          } else {
            if (isSelected) {
              buttonClass += "bg-blue-50 border-blue-400 text-blue-800 ring-2 ring-blue-200";
            } else {
              buttonClass += "bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-800 hover:border-gray-400";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswerSelect(answer)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center">
                <span className="mr-4 text-sm font-semibold min-w-[24px] h-6 bg-white rounded-full flex items-center justify-center border">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{answer}</span>
                {showResult && isCorrectAnswer && (
                  <span className="ml-auto text-green-600 text-lg">✓</span>
                )}
                {showResult && isSelected && !isCorrectAnswer && (
                  <span className="ml-auto text-red-600 text-lg">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Question Details */}
      {showResult && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2">
            <span className="font-medium text-gray-700">Correct Answer:</span>
            <span className="ml-2 text-gray-800">{question.answer}</span>
          </div>
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-sm text-gray-600">Tags:</span>
              {question.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface SingleQuestionComponentProps {
  subject: Subject;
  onBack: () => void;
}

export default function SingleQuestionComponent({ subject, onBack }: SingleQuestionComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  // Get all questions from all concepts
  const allQuestions = subject.concepts.flatMap(concept => concept.questions);
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleShowResult = () => {
    setShowResults(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults({});
    setCurrentQuestionIndex(0);
  };

  const calculateProgress = () => {
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-1">
      {/* Header */}
      <div className="mb-4">

        <div className='flex justify-between items-center align-middle'>
          <button
            onClick={onBack}
            className="flex flex-[0.2] !text-[15px] items-center !border-1 !border-[#6666] bg-[#f4f4f4] text-blue-600 hover:text-blue-800 mb-1 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="text-center mb-6 flex-[0.3]">
            <h1 className="!text-3xl font-bold text-gray-800 mb-0">{subject.subject}</h1>
            <p className="text-gray-600">Navigate through {totalQuestions} questions</p>
          </div>

          <div className="text-center mb-6 flex-[0.3]">
            {/* <h1 className="!text-4xl font-bold text-gray-800 mb-2">{subject.subject}</h1> */}
            {/* <p className="text-gray-600">Navigate through {totalQuestions} questions</p> */}
          </div>


        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {calculateProgress()}%</span>
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className=''>
        <div className="mt-0 mb-4 max-w-2xl mx-auto">
          {/* <h3 className="text-sm font-medium text-gray-700 mb-2">Jump to Question:</h3> */}
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
            {allQuestions.map((_, index) => {
              const isAnswered = answers[allQuestions[index].id];
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`text-xs rounded transition-colors ${
                    isCurrent 
                      ? 'bg-blue-600 text-white' 
                      : isAnswered 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Question Card */}
        <SingleQuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id] || null}
          onAnswerSelect={handleAnswerSelect}
          showResult={showResults[currentQuestion.id] || false}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

      </div>
      {/* Question Card */}
      {/* <SingleQuestionCard
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id] || null}
        onAnswerSelect={handleAnswerSelect}
        showResult={showResults[currentQuestion.id] || false}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      /> */}

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex gap-3">
          {answers[currentQuestion.id] && !showResults[currentQuestion.id] && (
            <button
              onClick={handleShowResult}
              className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Show Answer
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset All
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Question Navigator */}
      {/* <div className="mt-8 max-w-2xl mx-auto">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Jump to Question:</h3>
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
          {allQuestions.map((_, index) => {
            const isAnswered = answers[allQuestions[index].id];
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 text-xs rounded transition-colors ${
                  isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : isAnswered 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

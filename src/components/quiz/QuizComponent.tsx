import { useState, useEffect } from 'react';
import { Question, Concept } from '../../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}

function QuizCard({ question, selectedAnswer, onAnswerSelect, showResult }: QuizCardProps) {
  // Combine correct answer with incorrect answers and shuffle
  const allAnswers = [question.answer, ...(question.incorrect_answers || [])];
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answers when component mounts
    const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [question.id]);

  // const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="mb-4">
        <span className="text-sm text-gray-500 uppercase tracking-wide">Question {question.id}</span>
        <h3 className="text-lg font-semibold text-gray-800 mt-1">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrectAnswer = answer === question.answer;
          
          let buttonClass = "w-full p-4 text-left border rounded-lg transition-colors ";
          
          if (showResult) {
            if (isCorrectAnswer) {
              buttonClass += "bg-green-100 border-green-500 text-green-800";
            } else if (isSelected && !isCorrectAnswer) {
              buttonClass += "bg-red-100 border-red-500 text-red-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
            }
          } else {
            if (isSelected) {
              buttonClass += "bg-blue-100 border-blue-500 text-blue-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-800";
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
                <span className="mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{answer}</span>
                {showResult && isCorrectAnswer && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {showResult && isSelected && !isCorrectAnswer && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Correct Answer:</span> {question.answer}
          </p>
          {question.tags && (
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-medium">Tags:</span> {question.tags.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface QuizComponentProps {
  concept: Concept;
  subjectName: string;
  onBack: () => void;
}

export default function QuizComponent({ concept, subjectName, onBack }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = concept.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    });
    return { correct, total: totalQuestions, percentage: Math.round((correct / totalQuestions) * 100) };
  };

  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        
        <h1 className="text-2xl font-bold text-gray-800">{subjectName}</h1>
        <h2 className="text-lg text-gray-600">{concept.concept}</h2>
        
        {!quizCompleted && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Content */}
      {!quizCompleted ? (
        <div className="space-y-6">
          <QuizCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id] || null}
            onAnswerSelect={handleAnswerSelect}
            showResult={showResults}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-3">
              {!showResults && answers[currentQuestion.id] && (
                <button
                  onClick={handleShowResults}
                  className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50"
                >
                  Show Answer
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Summary */
        <div className="text-center space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="text-4xl font-bold mb-4">
              <span className={score.percentage >= 70 ? 'text-green-600' : 'text-red-600'}>
                {score.percentage}%
              </span>
            </div>
            <p className="text-gray-600">
              You got {score.correct} out of {score.total} questions correct
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retake Quiz
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

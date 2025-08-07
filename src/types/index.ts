// Quiz-related types
export interface Question {
  id: string;
  type: string;
  question: string;
  answer: string;
  incorrect_answers?: string[]; // For multiple choice questions
  image?: string;
  code_block?: string;
  tags: string[];
  path: string;
}

export interface Concept {
  concept: string;
  questions: Question[];
}

export interface Subject {
  subject: string;
  concepts: Concept[];
}

export interface QuizTopic {
  topic: string;
  subjects: Subject[];
}

// UI/Component types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Quiz state types
export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: Record<string, string>;
  isCompleted: boolean;
}

// User/Session types
export interface User {
  id: string;
  name: string;
  email?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


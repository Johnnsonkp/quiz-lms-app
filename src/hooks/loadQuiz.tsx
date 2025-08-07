import { QuizTopic } from '../types';

export const loadAllQuizData = async () => {
  const quizFiles = [
    { topic: 'canva-interview', subject: 'javascript' },
    { topic: 'canva-interview', subject: 'intro-to-canva' },
    { topic: 'bible-study', subject: 'genesis' }
  ];

  const allQuizData = [];
  
  for (const file of quizFiles) {
    try {
      const data = await import(`../data/${file.topic}/${file.subject}.json`);
      allQuizData.push(data.default);
    } catch (error) {
      console.error(`Error loading ${file.topic}/${file.subject}:`, error);
    }
  }
  
  return allQuizData;
};

// Transform individual quiz files into structured topic data
export const transformQuizDataToTopics = (quizDataArray: any[]): QuizTopic[] => {
  const topicsMap: { [key: string]: QuizTopic } = {};

  quizDataArray.forEach((quizData) => {
    const topicName = quizData.topic;
    const subjectName = quizData.subject;

    // If topic doesn't exist, create it
    if (!topicsMap[topicName]) {
      topicsMap[topicName] = {
        topic: topicName,
        subjects: []
      };
    }

    // Add subject to the topic
    topicsMap[topicName].subjects.push({
      subject: subjectName,
      concepts: quizData.concepts || []
    });
  });

  return Object.values(topicsMap);
};
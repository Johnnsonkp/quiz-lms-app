import { QuizTopic, Subject } from '../../types/index';

interface Props {
  selectedTopicData: QuizTopic;
  onSubjectClick: (subject: Subject) => void;
}

function SubjectCards({ selectedTopicData, onSubjectClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {selectedTopicData.subjects.map((subject) => (
        <button
          key={subject.subject}
          onClick={() => onSubjectClick(subject)}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left w-full"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-3">{subject.subject}</h2>
          <div className="space-y-2">
            {subject.concepts.map((concept, index) => (
              index < 3 &&
              <div key={concept.concept} className="border-l-4 border-blue-500 pl-3">
                <h3 className="text-sm font-medium text-gray-600">{concept.concept}</h3>
                <p className="text-xs text-gray-500">
                  {concept.questions.length} question{concept.questions.length !== 1 ? 's' : ''} available
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Questions:</span>
              <span className="text-lg font-bold text-green-600">
                {subject.concepts.reduce((total, concept) => total + concept.questions.length, 0)}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default SubjectCards
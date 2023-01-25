import Quiz from '@/components/Quiz';
import QuestionModel from '@/model/question'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



const BASE_URL = '/api';

export default function Home() {
	const router = useRouter();
	const [questionsIds, setQuestionsIds] = useState<number[]>([]);
	const [question, setQuestion] = useState<QuestionModel>();
	const [correctAnswers, setCorrectAnswers] = useState<number>(0);

	async function loadQuestionsIds() {
		const response = await fetch(`${BASE_URL}/quiz`);
		const questionsIds = await response.json();

		setQuestionsIds(questionsIds);
	}

	async function loadQuestion(id: number) {
		const response = await fetch(`${BASE_URL}/questions/${id}`);
		const questionData = await response.json();
		const newQuestion = QuestionModel.fromObject(questionData);

		setQuestion(newQuestion);
	}

	useEffect(() => {
		loadQuestionsIds()
	}, []);

	useEffect(() => {
		questionsIds.length > 0 && loadQuestion(questionsIds[0]);
	}, [questionsIds]);

	function nextQuestionId() {
		if (question) {
			const nextIndex = questionsIds.indexOf(question.id) + 1;
			return questionsIds[nextIndex];
		}
	}


	function answeredQuestion(clickedQuestion: QuestionModel) {
		setQuestion(clickedQuestion);
		const correct = clickedQuestion.isCorrect;

		setCorrectAnswers(correctAnswers + (correct ? 1 : 0));
	}

	function goToNextStep() {
		const nextId = nextQuestionId();
		nextId ? goToNextQuestion(nextId) : endQuiz();
	}

	function goToNextQuestion(questionId: number) {
		loadQuestion(questionId);
	}

	function endQuiz() {
		router.push({
			pathname: '/results',
			query: {
				totalQuestions: questionsIds.length,
				correctAnswers
			}
		});
	}

	return (
		question ?
			<Quiz question={question}
				isLastQuestion={nextQuestionId() === undefined}
				answeredQuestion={answeredQuestion}
				goToNextStep={goToNextStep} />
			: false
	);
}

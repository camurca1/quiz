import questions from '../questionsData';


export default function handler(req: any, res: any) {
	const choosenId = +req.query.id;
	const filteredQuestion = questions.filter(question => question.id === choosenId);

	if(filteredQuestion.length === 1) {
		const matchQuestion = filteredQuestion[0].shuffleAnswers();
		res.status(200).json(matchQuestion.toObject());
	} else {
		res.status(404).send();
	}
}

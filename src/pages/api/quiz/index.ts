import { shuffle } from "@/functions/randomizer";
import questions from "../questionsData";


export default function handler(req: any, res: any) {
    const questionsId = questions.map(question => question.id);

    res.status(200).json(shuffle(questionsId));
}
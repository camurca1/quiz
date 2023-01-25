import { shuffle } from "@/functions/randomizer";
import AnswerModel from "./answer";

export default class QuestionModel {
    #id: number;
    #header: string;
    #answers: AnswerModel[];
    #isCorrect: boolean;

    constructor(id: number, header: string, answers: any[], isCorrect = false) {
        this.#id = id;
        this.#header = header;
        this.#answers = answers;
        this.#isCorrect = isCorrect;
    }

    static fromObject(obj: QuestionModel): QuestionModel {
        const answers = obj.answers.map(answer => AnswerModel.fromObject(answer));
        
        return new QuestionModel(obj.id, obj.header, answers, obj.isCorrect);
    }

    toObject() {
        return {
            id: this.id,
            header: this.header,
            isAnswered: this.isAnswered,
            isCorrect: this.isCorrect,
            answers: this.#answers.map(answer => answer.toObject()),
        }
    }

    get id(){
        return this.#id;
    }

    get header(){
        return this.#header;
    }

    get answers(){
        return this.#answers;
    }

    get isCorrect(){
        return this.#isCorrect;
    }

    get isAnswered() {
        for(let answer of this.#answers){
            if(answer.isRevealed) return true;

        }

        return false;
    }

    get isNotAnswered() {
        return !this.isAnswered;
    }

    answerWith(questionIndex: number): QuestionModel {
        const isCorrect = this.answers[questionIndex]?.isCorrect
        const answers = this.answers.map((answer, i) => {
            const selectedAnswer = questionIndex === i;
            const shouldReveal = selectedAnswer || answer.isCorrect;
            return shouldReveal ? answer.reveal() : answer;
        });

        return new QuestionModel(this.id, this.header, answers, isCorrect);

    }

    shuffleAnswers(): QuestionModel {
        let shuffledAnswers = shuffle(this.answers);

        return new QuestionModel(this.id, this.header, shuffledAnswers, this.isCorrect);
    }

}
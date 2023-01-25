export default class AnswerModel {
    #value: string;
    #isCorrect: boolean;
    #isRevealed: boolean;

    constructor(value: string, isCorrect: boolean, isRevealed = false) {
        this.#value = value;
        this.#isCorrect = isCorrect;
        this.#isRevealed = isRevealed;
    }

    static correctAnswer(value: string) {
        return new AnswerModel(value, true);
    }

    static wrongAnswer(value: string) {
        return new AnswerModel(value, false);
    }

    static fromObject(obj: AnswerModel): AnswerModel {
        return new AnswerModel(obj.value, obj.isCorrect, obj.isRevealed);
    }

    toObject() {
        return {
            value: this.value,
            isCorrect: this.isCorrect,
            isRevealed: this.isRevealed
        };
    }

    get value() {
        return this.#value;
    }

    get isCorrect() {
        return this.#isCorrect;
    }

    get isRevealed() {
        return this.#isRevealed;
    }

    reveal() {
        return new AnswerModel(this.value, this.isCorrect, true);
    }


}
import styles from "../styles/Question.module.css";
import QuestionModel from "@/model/question";
import Header from "./Header";
import Answer from "./Answer";
import Countdown from "./Countdown";

const optionIndex = [
    {value: 'A', color: '#f2c866'},
    {value: 'B', color: '#f266ba'},
    {value: 'C', color: '#85d4f2'},
    {value: 'D', color: '#bce596'}
]

interface QuestionProps {
    value: QuestionModel;
    timeToAnswer?: number;
    onChosenAnswer: (index: number) => void;
    onTimeout: () => void;
}

export default function Question(props: QuestionProps) {
    const question = props.value;

    function renderAnswers() {
        return question.answers.map((answer, i) => {
            return <Answer key={`${question.id}-${i}`}
                           value={answer}
                           index={i}
                           optionIndex={optionIndex[i].value}
                           optionIndexBG={optionIndex[i].color}
                           onChosenAnswer={props.onChosenAnswer}/>
        });
    }

    return (
        <div className={styles.question}>
            <Header text={question.header} />
            <Countdown key={question.id} duration={props.timeToAnswer ?? 10} onTimeout={props.onTimeout}/>
            {renderAnswers()}
        </div>
    )
}
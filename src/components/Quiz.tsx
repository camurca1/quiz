import styles from "../styles/Quiz.module.css";
import QuestionModel from "@/model/question";
import Question from "./Question";
import Button from "./Button";

interface QuizProps {
    question: QuestionModel;
    isLastQuestion: boolean;
    answeredQuestion: (question: QuestionModel) => void;
    goToNextStep: () => void;
}

export default function Quiz(props: QuizProps) {
    function onChosenAnswer(index: number) {
        if(props.question.isNotAnswered) {
            props.answeredQuestion(props.question.answerWith(index));
        }
    }

    return (
        <div className={styles.quiz}>
            {props.question ? 
                <Question value={props.question} 
                          timeToAnswer={6}
                          onChosenAnswer={onChosenAnswer}
                          onTimeout={props.goToNextStep}/>
                : "Carregando..."
            }
            <Button onClick={props.goToNextStep}
                    text={props.isLastQuestion ? 'Finalizar' : 'Próximo'} />

        </div>
    )
}
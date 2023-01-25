import styles from '../styles/Answer.module.css';
import AnswerModel from "@/model/answer";

interface AnswerProps {
    value: AnswerModel;
    index: number;
    optionIndex: string;
    optionIndexBG: string;
    onChosenAnswer: (index: number) => void;
}

export default function Answer(props: AnswerProps) {
    const answer = props.value;
    const isRevealed = answer.isRevealed ? styles.isRevealed : '';

    return (
        <div className={styles.answer} onClick={() => props.onChosenAnswer(props.index)} >
            <div className={`${isRevealed} ${styles.answerContent}`}>
                <div className={styles.cardFront}>
                    <div className={styles.optionIndex} style={{ backgroundColor: props.optionIndexBG }}>
                        {props.optionIndex}
                    </div>
                    <div className={styles.value}>
                        {answer.value}
                    </div>
                </div>
                <div className={styles.cardBack}>
                    {answer.isCorrect ? (
                        <div className={styles.correctAnswer}>
                            <div>A resposta certa é...</div>
                            <div className={styles.value}>{answer.value}</div>
                        </div>
                    ) : (
                        <div className={styles.wrongAnswer}>
                            <div>A resposta informada esta errada...</div>
                            <div className={styles.value}>{answer.value}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
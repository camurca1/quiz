import styles from "../styles/Results.module.css";
import { useRouter } from "next/router"
import Stats from "@/components/Stats";
import Button from "@/components/Button";


export default function Results() {
    const router = useRouter();
    const totalQuestions = router.query.totalQuestions;
    const correctAnswers = router.query.correctAnswers;
    const hitRatio = (totalQuestions && correctAnswers) ? Math.round((+correctAnswers / +totalQuestions) * 100) : 0;


    return (
        <div className={styles.results}>
            <h1>Resultado Final</h1>
            <div style={{display: "flex"}}>
                <Stats text="Perguntas" value={totalQuestions} />
                <Stats text="Certas" value={correctAnswers} backgroundColor="#9cd2a4"/>
                <Stats text="Taxa de Acerto" value={`${hitRatio}%`} backgroundColor="#de6a33"/>
            </div>
            <Button href="/" text="Reiniciar"/>
        </div>
    )
}
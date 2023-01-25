import styles from '../styles/Countdown.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface CountdownProps {
    key: any,
    duration: number;
    onTimeout: () => void;

}

export default function Countdown(props: CountdownProps) {
    return (
        <div className={styles.countdown}>
            <CountdownCircleTimer duration={props.duration} 
                                  size={120}
                                  isPlaying
                                  onComplete={props.onTimeout}
                                  colors={["#bce596", "#f7b801", "#ed827a"]}
                                  colorsTime={[props.duration, props.duration/3, 0]}>
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}
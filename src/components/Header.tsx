import styles from '../styles/Header.module.css';


interface HeaderProps {
    text: string
}

export default function Header(props: HeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.text}>
                {props.text}
            </div>
        </div>
    )
}
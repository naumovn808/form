import { ClueProps } from "./Clue.props";
import styles from './Clue.module.css'

export default function Clue({ dataSet }: ClueProps) {
    return (
        <span className={styles['clue']} data-clue={dataSet}>
            ?
        </span>
    )
}
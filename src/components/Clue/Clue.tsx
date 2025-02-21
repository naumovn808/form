import { ClueProps } from "./Clue.props";
import styles from './Clue.module.css'
import cn from 'classnames'

export default function Clue({ dataSet, className }: ClueProps) {
    return (
        <span className={cn(styles['clue'], className)} data-clue={dataSet}>
            ?
        </span >
    )
}
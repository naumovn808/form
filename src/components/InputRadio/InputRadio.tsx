import styles from './InputRadio.module.css'
import { InputProps } from './Input.props'

export default function InputRadio({ children, ...props }: InputProps) {

    const checked = props.checked ? styles.checked : '';

    return (
        <label className={`${styles['input-radio']} ${checked}`}>

            <span className={styles['radio-icon']}>
                <svg width="6" height="6" viewBox="0 0 6 6" fill='none' xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 2.5L2.5 4.5L5.5 1" strokeLinecap="round" />
                </svg>
            </span>

            <input className='visually-hidden' type="radio" {...props} />
            {children}
        </label>
    )
}
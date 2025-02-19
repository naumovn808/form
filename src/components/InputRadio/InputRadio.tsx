import styles from './InputRadio.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

export default function InputRadio({ children, className, checked, appearence, ...props }: InputProps) {
    return (
        <label className={cn(
            styles['input-radio'],
            className,
            {
                [styles['checked']]: checked,
                [styles['input-radio__big']]: appearence === 'big'
            }
        )}>
            <span className={styles['radio-icon']}>
                <svg width="6" height="6" viewBox="0 0 6 6" fill='none' xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 2.5L2.5 4.5L5.5 1" strokeLinecap="round" />
                </svg>
            </span>
            <input className='visually-hidden' type="radio" checked={checked} {...props} />
            {children}
        </label>
    );
}
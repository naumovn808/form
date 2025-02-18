import styles from './Text.module.css'
import cn from 'classnames';
import { TextProps } from './Text.props';

export default function Text({ children, className, appearence }: TextProps) {
    return <p className={cn(styles['text'], className, {
        [styles['small']]: appearence === 'small',
        [styles['big']]: appearence === 'big',
    })}>{children}</p>
}

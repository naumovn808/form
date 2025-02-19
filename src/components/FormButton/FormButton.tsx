import styles from './FormButton.module.css';
import { FormButtonProps } from './FormButton.props';
import cn from 'classnames';

function FormButton({ children, className, appearence = 'small', ...props }: FormButtonProps) {
    return (
        <button className={cn(styles['button'], styles['accent'], className, {
            [styles['small']]: appearence === 'small',
            [styles['big']]: appearence === 'big'
        })} {...props}> {children}</button >
    );
}

export default FormButton;
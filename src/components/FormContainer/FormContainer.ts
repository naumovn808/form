import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface FormContainerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    appearence?: 'big' | null;
}
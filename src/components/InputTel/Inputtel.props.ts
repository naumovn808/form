import { InputHTMLAttributes } from 'react';

export interface InputTelProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    value: string;
}
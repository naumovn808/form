import { ButtonHTMLAttributes } from 'react';

export default interface HeadStepsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    count: number;
}
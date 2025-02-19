import { HTMLAttributes } from 'react';

export interface ClueProps extends HTMLAttributes<HTMLSpanElement> {
    dataSet: string;
}

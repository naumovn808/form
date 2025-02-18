import { HTMLAttributes, ReactNode } from 'react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
    appearence?: 'big' | 'small' | null;
}

import { SelectHTMLAttributes } from 'react';
import { Country } from '../../interfaces/data';


export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    countries: Country[];
}



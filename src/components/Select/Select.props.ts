import { Country } from '../../interfaces/data';

export interface SelectProps {
    countries: Country[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/formSlice';
import { RootState } from '../../store/index';
import { SelectProps } from './Select.props';
import styles from './Select.module.css';
import cn from 'classnames';

export default function Select({ countries }: SelectProps) {
    const selectedCountry = useSelector((state: RootState) => state.form.formData.country);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: string) => {
        dispatch(setFormData({ country: value }));
        setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={styles.dropdown}>
            <div
                className={cn(styles['select'], "custom-select", {
                    ['open']: isOpen,
                    ['show']: selectedCountry
                })}
                onClick={() => setIsOpen(!isOpen)}>
                {selectedCountry || 'Выберите страну'}
            </div>
            {isOpen && (
                <ul className={styles.options}>
                    {countries.map((country, index) => (
                        <li
                            key={index}
                            className={styles.option}
                            onClick={() => handleSelect(country.name)}>
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
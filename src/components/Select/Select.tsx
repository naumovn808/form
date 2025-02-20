import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import styles from './Select.module.css';
import cn from 'classnames';
import { SelectProps } from './Select.props';



export default function Select({ countries, onChange }: SelectProps) {
    const selectedCountry = useSelector((state: RootState) => state.form.formData.country);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


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
                            onClick={(e) => {
                                e.preventDefault();
                                onChange({ target: { value: country.name } } as React.ChangeEvent<HTMLSelectElement>)
                                setIsOpen(false)
                            }}>
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
import { useState, useEffect, useRef } from 'react';
import styles from './InputDate.module.css';
import cn from 'classnames';

interface DateSelectProps {
    type: 'day' | 'month' | 'year';
    options: { name: string; value: string; }[];
    selectedDatePart: string;
    onSelect: (value: string) => void;
    className?: string;
}

function DateSelect({ type, options, selectedDatePart, onSelect, className }: DateSelectProps) {
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
                className={cn(styles['select'], "custom-select small", className, {
                    ['open']: isOpen,
                    ['show']: selectedDatePart,
                })}
                onClick={() => setIsOpen(!isOpen)}>
                {selectedDatePart || type.charAt(0).toUpperCase() + type.slice(1)}
                {isOpen && (
                    <ul className={`${styles.options} ${isOpen ? styles['open'] : ''}`}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={styles.option}
                                onClick={() => {
                                    onSelect(option.value);
                                    setIsOpen(false);
                                }}>
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DateSelect;
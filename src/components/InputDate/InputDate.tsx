import React, { useState, useEffect, useRef, useCallback } from 'react';
import DateSelect from './DateSelect';
import styles from './InputDate.module.css';
import { getDaysInMonth } from 'date-fns';
import { default as DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputDateProps } from './InputDate.props';

export function InputDate({ dateValue, onChange }: InputDateProps) {
    const [day, setDay] = useState(() => {
        if (dateValue) {
            try {
                const date = new Date(dateValue);
                return String(date.getDate()).padStart(2, '0');
            } catch (error) {
                console.error("Invalid date format:", dateValue, error);
                return '';
            }
        }
        return '';
    });
    const [month, setMonth] = useState(() => {
        if (dateValue) {
            try {
                const date = new Date(dateValue);
                return String(date.getMonth() + 1).padStart(2, '0');
            } catch (error) {
                console.error("Invalid date format:", dateValue, error);
                return '';
            }
        }
        return '';
    });
    const [year, setYear] = useState(() => {
        if (dateValue) {
            try {
                const date = new Date(dateValue);
                return String(date.getFullYear());
            } catch (error) {
                console.error("Invalid date format:", dateValue, error);
                return '';
            }
        }
        return '';
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const previousDateValue = useRef<string | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        if (dateValue !== previousDateValue.current) {
            previousDateValue.current = dateValue;
        }
    }, [dateValue]);

    useEffect(() => {
        if (day && month && year) {
            const formattedDate = `${year}-${month}-${day}`;
            if (formattedDate !== previousDateValue.current) {
                onChange(formattedDate);
            }
            setSelectedDate(new Date(formattedDate));
        } else {
            if (day === '' && month === '' && year === '') {
                if (previousDateValue.current !== '') {
                    onChange('');
                }
                setSelectedDate(null);
            }
        }
    }, [day, month, year, onChange]);

    const handleDaySelect = (day: string) => {
        setDay(day);
    };

    const handleMonthSelect = (month: string) => {
        setMonth(month);
    };

    const handleYearSelect = (year: string) => {
        setYear(year);
    };

    const handleCalendarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('.custom-select')) return;
        setIsCalendarOpen(true);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const newDay = String(date.getDate()).padStart(2, '0');
            const newMonth = String(date.getMonth() + 1).padStart(2, '0');
            const newYear = String(date.getFullYear());

            if (newDay !== day || newMonth !== month || newYear !== year) {
                setDay(newDay);
                setMonth(newMonth);
                setYear(newYear);
            }
        } else {
            setDay('');
            setMonth('');
            setYear('');
            onChange('');
        }
        setIsCalendarOpen(false);
    };

    const generateDays = () => {
        const numDays = month && year ? getDaysInMonth(new Date(Number(year), Number(month) - 1)) : 31;
        const days = [];
        for (let i = 1; i <= numDays; i++) {
            days.push(String(i).padStart(2, '0'));
        }
        return days;
    };

    const generateMonths = () => {
        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

        return months.map((month, index) => ({
            name: month,
            value: String(index + 1).padStart(2, '0'),
        }));
    };

    const getMonthName = (monthIndex: string) => {
        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        return months[Number(monthIndex) - 1] || '';
    };

    const generateYears = () => {
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            years.push(String(i));
        }
        return years;
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            setIsCalendarOpen(false);
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className={styles['input-date']} ref={calendarRef} onClick={handleCalendarClick}>
            <DateSelect
                className={styles['day']}
                type="day"
                options={generateDays().map(day => ({ name: day, value: day }))}
                selectedDatePart={day}
                onSelect={handleDaySelect}
            />
            <DateSelect
                className={styles['month']}
                type="month"
                options={generateMonths()}
                selectedDatePart={month ? getMonthName(month) : ''}
                onSelect={handleMonthSelect}
            />
            <DateSelect
                className={styles['year']}
                type="year"
                options={generateYears().map(year => ({ name: year, value: year }))}
                selectedDatePart={year}
                onSelect={handleYearSelect}
            />

            <label className={styles['custom-calendar']}>
                <span className={styles['calendar-icon']}>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 3.5V10.5H1.5L0.5 9.5V3.5M11 3.5H0.5M11 3.5L10.5 1.5H1.5L0.5 2.5V3.5M3 5V9M6 5V9M9 5V9M3.5 0.5V2.5M6 0.5V2.5M8.5 0.5V2.5" strokeLinecap="round" />
                    </svg>
                </span>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Выберите дату"
                    showYearDropdown
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    open={isCalendarOpen}
                    onClickOutside={() => setIsCalendarOpen(false)}
                />
            </label>
        </div>
    );
}
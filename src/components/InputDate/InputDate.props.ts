export interface DateSelectProps {
    type: 'day' | 'month' | 'year';
    options: { name: string; value: string; }[];
    selectedDatePart: string;
    onSelect: (value: string) => void;
    className?: string;
}

export interface InputDateProps {
    dateType: 'start' | 'end';
    dateValue: string | null;
    onChange: (date: string | null) => void;
}

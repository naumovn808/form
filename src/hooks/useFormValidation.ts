import { useState, useCallback } from 'react';
import { FormData } from '../interfaces/Form';

interface ValidationOptions {
    step: number;
}

const useFormValidation = (formData: FormData, validationOptions: ValidationOptions) => {
    const { step } = validationOptions;

    const [errors, setErrors] = useState<FormData>({
        country: '',
        coverageType: '',
        startDate: '',
        endDate: '',
        activities: '',
        phone: '',
        program: ''
    });

    // текст ваалидации обычно с бэка, пока сделаю так
    const validate = useCallback(() => {
        const newErrors = { ...errors };
        newErrors.country = formData.country ? '' : 'Пожалуйста, выберите страну.';
        newErrors.coverageType = formData.coverageType.length > 0 ? '' : 'Пожалуйста, выберите тип покрытия.';
        newErrors.startDate = formData.startDate ? '' : 'Пожалуйста, выберите дату начала.';
        newErrors.endDate = formData.endDate ? '' : 'Пожалуйста, выберите дату окончания.';
        newErrors.activities = formData.activities.length > 0 ? '' : 'Пожалуйста, выберите хотя бы одну активность.';
        newErrors.phone = formData.phone.length > 10 ? '' : 'Пожалуйста, введите полный номер телефона.';

        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            if (start >= end) {
                newErrors.endDate = 'Дата окончания должна быть позже даты начала.';
            }
        }

        if (step === 1) {
            newErrors.program = formData.program ? '' : 'Пожалуйста, выберите программу.';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    }, [formData, errors, step]);

    const clearError = useCallback((fieldName: keyof FormData) => {
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    }, []);


    return { errors, validate, clearError };
};

export default useFormValidation;
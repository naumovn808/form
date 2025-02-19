export interface FormState {
    step: number;
    formData: {
        country: string;
        coverageType: string[];
        program: string | null;
        startDate: string | null;
        endDate: string | null;
        phone: string;
        activities: string[];
    };
}
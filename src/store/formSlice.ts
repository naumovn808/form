import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    step: 0,
    formData: {
        country: '',
        coverageType: [] as string[],
        program: null as string | null,
        startDate: '',
        endDate: '',
        purpose: '',
        phone: '',
        activities: [] as string[]
    }
};

if (localStorage.getItem('step')) {
    initialState.step = Number(localStorage.getItem('step'));
}

if (localStorage.getItem('formData')) {
    try {
        const storedFormData = JSON.parse(localStorage.getItem('formData') as string);
        initialState.formData = storedFormData;
    } catch (error) {
        console.error("Error parsing formData from localStorage:", error);

        initialState.formData = {
            country: '',
            coverageType: [] as string[],
            program: null as string | null,
            startDate: '',
            endDate: '',
            purpose: '',
            phone: '',
            activities: [] as string[]
        };
    }
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Partial<typeof initialState['formData']>>) => {
            state.formData = { ...state.formData, ...action.payload };
            localStorage.setItem('formData', JSON.stringify(state.formData));
        },
        setProgram: (state, action: PayloadAction<string | null>) => {
            state.formData.program = action.payload;
            localStorage.setItem('formData', JSON.stringify(state.formData));
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step += action.payload;
            if (state.step < 0) state.step = 0;
            localStorage.setItem('step', state.step.toString());
        },
        setSelectedActivities: (state, action: PayloadAction<string[]>) => {
            state.formData.activities = action.payload;
            localStorage.setItem('formData', JSON.stringify(state.formData));
        },

        setSelectedCoverage: (state, action: PayloadAction<string[]>) => {
            state.formData.coverageType = action.payload;
            localStorage.setItem('formData', JSON.stringify(state.formData));
        }
    }
});

export const { setFormData, setProgram, setStep, setSelectedActivities, setSelectedCoverage } = formSlice.actions;
export default formSlice.reducer;
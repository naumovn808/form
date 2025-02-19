export interface Activity {
    id: string;
    name: string;
}

export interface Coverage {
    medicine: number | null;
    accident: number | null;
    covid: number | null;
    evacuation: number | null;
    transportation: number | null;
    compensation: number | null;
}

export interface Program {
    id: number;
    name: string;
    liability: number | null;
    coverages: Coverage | null;
}

export interface Country {
    id: number;
    name: string;
    isInSchengen: boolean;
    programs: Program[]; 
}

export interface AppData {
    activities: Activity[];
    programs: Program[];
    countries: Country[];
}
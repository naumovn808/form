export interface Activity {
    id: number;
    name: string;
}

export interface Coverage {
    medicine: number;
    accident: number;
    covid: number;
    evacuation: number;
    transportation: number;
    compensation: number;
}

export interface Program {
    id: number;
    name: string;
    liability: number;
    coverages: Coverage;
}

export interface Country {
    id: number;
    name: string;
    isInSchengen: number;
    programs: { id: number; name: string; liability: number | null; coverages: Coverage | null; }[];
}

export interface AppData {
    activities: Activity[];
    programs: Program[];
    countries: Country[];
}
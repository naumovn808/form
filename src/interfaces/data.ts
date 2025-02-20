export interface Activity {
    id: number;
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
    isInSchengen: number;
    programs: Program[];
  }

export interface AppData {
    activities: Activity[];
    programs: Program[];
    countries: Country[];
}
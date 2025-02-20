import { useState, useEffect } from 'react';
import data from '../JSON/data.json';
import { Program, Country, AppData } from '../interfaces/data.ts';

const usePrograms = (country: Country | undefined) => {
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([]);

  useEffect(() => {
    const typedData = data as AppData;

    if (country) {

        const selectedCountryData = typedData.countries.find(c => c.name === country?.name);

      if (selectedCountryData) {
        const programIds = selectedCountryData.programs.map(program => program.id);
        const programs = typedData.programs.filter(p => programIds.includes(p.id));
        setAvailablePrograms(programs);
      } else {
        setAvailablePrograms([]);
      }
    } else {
      setAvailablePrograms([]);
    }
  }, [country]);

  return availablePrograms;
};

export default usePrograms;
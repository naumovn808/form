import { useState } from "react";

export function InputTel() {
    const [countryCode, setCountryCode] = useState('+998'); // Код страны по умолчанию

    const countries = [
        { code: '+1', name: 'США' , icon : },
        { code: '+998', name: 'Узбекистан' },
       
    ];

    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };

    return (
        <select value={countryCode} onChange={handleChange}>
            {countries.map((country) => (
                <option key={country.code} value={country.code}>
                    {country.name} ({country.code})
                </option>
            ))}
        </select>
    );
}
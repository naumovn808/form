import { useState, useCallback } from "react";
import { PhoneInput } from "react-international-phone";
import "./InputTel.css";
import { InputTelProps } from "./Inputtel.props";

export default function InputTel({ onChange, value, ...props }: InputTelProps) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleCountryChange = (countryData: any) => {
        console.log("Выбрана страна:", countryData);
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = (isOpen: boolean) => {
        setIsDropdownOpen(isOpen);
    };

    const handlePhoneChange = useCallback(
        (phone: string) => {
            onChange(phone);
        },
        [onChange]
    );


    return (
        <div className="input-tel-container">
            <PhoneInput
                defaultCountry="uz"
                value={value}
                onChange={handlePhoneChange}
                onCountryChange={handleCountryChange}
                onDropdownToggle={handleDropdownToggle}
                {...props}
            />

            {isDropdownOpen && (
                <div className="react-international-phone-country-selector-dropdown">
                </div>
            )}
        </div>
    );
}

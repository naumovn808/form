import { useCallback } from "react";
import { PhoneInput } from "react-international-phone";
import "./InputTel.css";
import { InputTelProps } from "./Inputtel.props";


export default function InputTel({ onChange, value, ...props }: InputTelProps) {

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
                {...props}
            />

        </div>
    );
}

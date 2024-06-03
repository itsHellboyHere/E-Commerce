import { useState } from "react";
const FormCheckbox = ({ label, name, defaultValue, size }) => {
    const [checked, setChecked] = useState(defaultValue);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div className="form-control items-center">
            <label className="label cursor-pointer" htmlFor={name}>
                <span className="label-text capitalize">{label}</span>
            </label>
            <input
                type="checkbox"
                name={name}
                value={checked} // Ensure value is set here
                checked={checked}
                onChange={handleChange}
                className={`checkbox checkbox-primary ${size}`}
            />
        </div>
    );
};

export default FormCheckbox;

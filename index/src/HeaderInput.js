import React from 'react';

const HeaderInput = ({ placeholder, className, value, onChange, selectedValue }) => {
    // Conditionally add "text-white" class if selectedValue is 3 or 4
    const inputClass = (selectedValue === 'value3' || selectedValue === 'value4') ? 'text-white' : '';

    return (
        <div className="row">
            <div className={`cell2 ${className} full-width`}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`transparent-input ${inputClass}`}
                    style={{ textAlign: 'center' }}
                />
            </div>
        </div>
    );
};


export default HeaderInput;

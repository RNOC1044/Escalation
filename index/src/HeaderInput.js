import React from 'react';

const HeaderInput = ({ placeholder, className, value, onChange }) => (
    <div className="row">
        <div className={`cell2 ${className} full-width`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="transparent-input"
                style={{ textAlign: 'center' }}
            />
        </div>
    </div>
);

export default HeaderInput;

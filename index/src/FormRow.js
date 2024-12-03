import React from 'react';
import DateTimePicker from './DateTimePicker';

const FormRow = ({ label, inputName, isDateTimePicker, value, onChange }) => (
    <div className="row">
        <div className="cell label">{label}</div>
        <div className="cell2 input-cell">
            {isDateTimePicker ? (
                <DateTimePicker value={value} onChange={onChange} />
            ) : (
                <input
                    type="text"
                    name={inputName}
                    value={value}
                    onChange={onChange}
                    className="transparent-input"
                />
            )}
        </div>
    </div>
);

export default FormRow;

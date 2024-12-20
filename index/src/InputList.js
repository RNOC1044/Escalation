import React, { useEffect } from 'react';
import checkIcon from './assets/images/checkIcon.png';

const InputList = ({ inputs, selectedInput, setSelectedInput, selectedData, textValues, setTextValues }) => {

    useEffect(() => {
        if (selectedData && selectedData.textValues) {
            setTextValues(selectedData.textValues);
        }
    }, [selectedData, setTextValues]);    

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        setTextValues((prev) => {
            const newTextValues = [...prev];
            newTextValues[index] = value;
            return newTextValues;
        });
    };    
    setTimeout(() => {
        const textAreas = document.querySelectorAll('textarea.transparent-input');
        if (selectedData.sizes) {
            textAreas.forEach((textarea, index) => {
                textarea.style.height = `${selectedData.sizes[index]}px`;
            });
        } else {
            textAreas.forEach((textarea) => {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        }
    }, 0);
    
    const autoResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div id="inputContainer">
            {inputs.map((input, index) => (
                <div
                    key={index}
                    className={`row ${selectedInput === index ? 'selected-input' : ''}`}
                    onClick={() => setSelectedInput(index)}
                >
                    <div className="cell2 labeltext">
                        {index % 2 === 0 && <img src={checkIcon} alt="Checked" className="check-icon" />}
                    </div>
                    <div className="cell2 input-cell1">
                        <textarea
                            rows="1"
                            className="transparent-input"
                            value={textValues[index] || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            onInput={autoResize}
                            style={{ overflow: 'hidden', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            maxLength={1000}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InputList;

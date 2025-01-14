import React from 'react';
import ppImage from './assets/images/pp.png';

const ImageTable = ({ toggleThermometer, toggleThermometerOrange, toggleThermometerRed, selectedCells, setSelectedCells }) => {
    const toggleColor = (index) => {
        const newSelectedCells = [...selectedCells];
        newSelectedCells[index] = !newSelectedCells[index];
        setSelectedCells(newSelectedCells);
        // ตรวจสอบ index เพื่อเปลี่ยนภาพปรอทตามเซลล์ที่คลิก
        if (index === 1 && toggleThermometer) {
            toggleThermometer();
        } else if (index === 2 && toggleThermometerOrange) {
            toggleThermometerOrange();
        } else if (index === 3 && toggleThermometerRed) {
            toggleThermometerRed();
        }
    };

    return (
        <table className="image-table">
            <tbody>
                <tr>
                    {[...Array(4)].map((_, idx) => (
                        <th key={idx} style={{ backgroundColor: '#dbdbdb' }}>
                            <img src={ppImage} alt="Person" className="resized-image" />
                        </th>
                    ))}
                </tr>
                <tr>
                    <td className={`hour1 ${selectedCells[0] ? 'selected' : ''}`} rowSpan="2" onClick={() => toggleColor(0)}>
                        ผส.บตน.<br />ผส.บลตน.
                    </td>
                    <td className={`hour2 ${selectedCells[1] ? 'selected' : ''}`} rowSpan="2" onClick={() => toggleColor(1)}>
                        ผจก.บตน.
                    </td>
                    <td className={`hour3 ${selectedCells[2] ? 'selected' : ''}`} onClick={() => toggleColor(2)}>
                        ชจญ.ตน.
                    </td>
                    <td className={`hour4 ${selectedCells[3] ? 'selected' : ''}`} rowSpan="2" onClick={() => toggleColor(3)}>
                        รจญ.น.
                    </td>
                </tr>
                <tr></tr>
                <tr className="time-row">
                    {[...Array(4)].map((_, idx) => (
                        <td
                            key={idx}
                            className={`hour${idx + 11} ${selectedCells[idx + 4] ? 'selected' : ''}`}
                            onClick={() => toggleColor(idx + 4)}
                        >
                            {`${idx + 1} ชั่วโมง`}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default ImageTable;

import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './styles.css';

const Dropdown = ({ selectedValue, setSelectedValue }) => {
    const [tooltipContent, setTooltipContent] = useState('เลือกสถานะเพื่อเปลี่ยนสี');

    useEffect(() => {
        const dropdown = document.getElementById('dropdown');
        const header = document.querySelector('.header');
        const headerInput2 = document.querySelector('.header-input2');
        const label = document.getElementById('status-label');

        const colorClasses = [
            'header-green', 'header-yellow', 'header-rgb', 'header-red',
            'dropdown-green', 'dropdown-yellow', 'dropdown-rgb', 'dropdown-red',
            'status-labelgreen', 'status-labelyellow', 'status-labelrgb', 'status-labelred',
            'pending-text'
        ];
        
        // ลบคลาสสีเก่าออก
        header.classList.remove(...colorClasses);
        headerInput2.classList.remove(...colorClasses);
        label.classList.remove(...colorClasses);
        dropdown.classList.remove(...colorClasses);

        // เปลี่ยนสีและข้อความ tooltip
        if (selectedValue === 'value1') {
            dropdown.classList.add('dropdown-green');
            header.classList.add('header-green');
            headerInput2.classList.add('header-green');
            label.classList.add('status-labelgreen');
            setTooltipContent('วงจร UP ปกติ');
        } else if (selectedValue === 'value2') {
            dropdown.classList.add('dropdown-yellow');
            header.classList.add('header-yellow');
            headerInput2.classList.add('header-yellow');
            label.classList.add('status-labelyellow');
            setTooltipContent('วงจร: Down ไม่เกิน 4 ชม.');
        } else if (selectedValue === 'value3') {
            dropdown.classList.add('dropdown-rgb');
            header.classList.add('header-rgb'); 
            headerInput2.classList.add('header-rgb'); 
            label.classList.add('status-labelrgb');
            setTooltipContent('หยุดเวลา: Pending');
        } else if (selectedValue === 'value4') {
            dropdown.classList.add('dropdown-red');
            header.classList.add('header-red');
            headerInput2.classList.add('header-red');
            label.classList.add('status-labelred');
            setTooltipContent('วงจร:DOWN เกิน 4 ชม.');
        }
    }, [selectedValue]);

    return (
        <div className="row">
            <div className="cell label1" id="status-label">สถานะ</div>
            <div className="dropdown full-width">
                <select
                    id="dropdown"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    data-tooltip-id="dropdown-tooltip"
                >
                    <option value="value1">UP</option>
                    <option value="value2">Down</option>
                    <option value="value3">Pending</option>
                    <option value="value4">DOWN</option>
                </select>
                <Tooltip id="dropdown-tooltip" place="right" content={tooltipContent} />
            </div>
        </div>
    );
};

export default Dropdown;

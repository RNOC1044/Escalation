import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './styles.css';
import HeaderInput from './HeaderInput';
import FormRow from './FormRow';
import Dropdown from './Dropdown';
import InputList from './InputList';
import ButtonContainer from './ButtonContainer';
import ImageTable from './ImageTable';
import greenThermometer from './assets/images/G-Photoroom.png';
import yellowThermometer from './assets/images/Y-Photoroom.png';
import orangeThermometer from './assets/images/O-Photoroom.png';
import redThermometer from './assets/images/R.png';

const FormComponent = ({ selectedData, onSave }) => {
  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedValue, setSelectedValue] = useState("value1");
  const [thermometerImage, setThermometerImage] = useState(greenThermometer);
  const [isYellow, setIsYellow] = useState(false);
  const [isOrange, setIsOrange] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [selectedCells, setSelectedCells] = useState(Array(8).fill(false));
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [province, setProvince] = useState('');
  const [ticketNo, setTicketNo] = useState('');
  const [upTime, setUpTime] = useState('');
  const [downTime, setDownTime] = useState('');
  const [textValues, setTextValues] = useState([]);
  const [faultTime, setFaultTime] = useState('');
  const formRef = useRef(null); // สร้าง useRef สำหรับฟอร์ม
  //const q = 'some value';
  
  const handleDownloadCapture = async () => {
    if (formRef.current) {
      try {
        const canvas = await html2canvas(formRef.current, {
          scale: 2, // เพิ่มความละเอียด
          useCORS: true,
        });
  
        // แปลง canvas เป็นภาพ PNG
        const dataURL = canvas.toDataURL("image/png");
  
        // สร้างลิงก์ดาวน์โหลด
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "captured-image.png"; // ชื่อไฟล์ที่ดาวน์โหลด
        link.click();
  
        alert("ดาวน์โหลดภาพสำเร็จ!");
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแคปภาพ:", error);
        alert("ไม่สามารถดาวน์โหลดภาพได้");
      }
    }
  };

  // ฟังก์ชันแคปเจอร์และคัดลอกไปยังคลิปบอร์ด
  const handleCaptureAndCopy = async () => {
    if (formRef.current) {
        try {
            // ดึงทุก textarea
            const textAreas = formRef.current.querySelectorAll('textarea.transparent-input');

            // สร้าง div ใหม่เพื่อเลียนแบบ textarea
            textAreas.forEach((textarea) => {
                const div = document.createElement('div');
                div.style.whiteSpace = 'pre-wrap'; // รักษาบรรทัดใหม่
                div.style.wordWrap = 'break-word'; // ตัดคำ
                div.style.overflowWrap = 'break-word'; // จัดการคำล้น
                //div.style.lineHeight = '1.5'; // ระยะห่างระหว่างบรรทัด
                div.style.fontSize = window.getComputedStyle(textarea).fontSize; // ใช้ขนาดฟอนต์เดียวกัน
                div.style.fontFamily = window.getComputedStyle(textarea).fontFamily; // ใช้ฟอนต์เดียวกัน
                div.style.padding = window.getComputedStyle(textarea).padding; // ใช้ padding เดียวกัน
                div.style.border = window.getComputedStyle(textarea).border; // ใช้ border เดียวกัน
                div.style.backgroundColor = 'transparent'; // ให้เป็นพื้นหลังโปร่งใส
                div.style.position = 'absolute'; // ทำให้ div ทับที่เดิม
                div.style.left = textarea.offsetLeft + 'px';
                div.style.top = textarea.offsetTop + 'px';
                div.style.width = textarea.offsetWidth + 'px';
                div.style.height = textarea.offsetHeight + 'px';
                div.innerText = textarea.value; // ใส่ข้อความจาก textarea
                div.style.textAlign = 'left'; // จัดข้อความชิดซ้าย
                div.style.fontWeight = '360'; // ข้อความตัวหนา
                
                textarea.style.visibility = 'hidden'; // ซ่อน textarea ชั่วคราว
                textarea.parentElement.appendChild(div);
            });

            // ใช้ html2canvas เพื่อแคปเจอร์ฟอร์ม
            const canvas = await html2canvas(formRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            });

            // คืนค่า visibility ของ textarea
            textAreas.forEach((textarea) => {
                textarea.style.visibility = 'visible';
                const div = textarea.parentElement.querySelector('div');
                if (div) textarea.parentElement.removeChild(div);
            });

            // แปลง canvas เป็น Blob และคัดลอกไปยังคลิปบอร์ด
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
            if (navigator.clipboard && navigator.clipboard.write) {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob,
                    }),
                ]);
                alert('คัดลอกภาพไปยังคลิปบอร์ดสำเร็จแล้ว!');
            } else {
                alert('เบราว์เซอร์ของคุณไม่รองรับการคัดลอกภาพไปยังคลิปบอร์ด');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการคัดลอกภาพ:', error);
            alert('ไม่สามารถคัดลอกภาพได้');
        }
    }
};

  // เติมข้อมูลจาก selectedData เมื่อได้รับ props
  useEffect(() => {
    if (selectedData) {
        setInput(selectedData.id || '');
        setInput2(selectedData.name || '');
        setProvince(selectedData.province || selectedData.area || '');
        setTicketNo(selectedData.ticketNo || '');
        setUpTime(selectedData.upTime || '');
        setDownTime(selectedData.downTime || '');
        setFaultTime(selectedData.faultTime || '');
        setTextValues(selectedData.textValues || []);
        setSelectedCells(selectedData.selectedCells || Array(8).fill(false));
        setSelectedValue(selectedData.selectedValue || 'value1');
        setIsYellow(selectedData.isYellow || false);
        setIsOrange(selectedData.isOrange || false);
        setIsRed(selectedData.isRed || false);
        setThermometerImage(selectedData.thermometerImage || greenThermometer);
        setInputs(selectedData.inputs || []);
    }
}, [selectedData]);

  const addInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length },
      { id: prevInputs.length + 1 },
    ]);

    setTextValues((prevTextValues) => {
      const newTextValues = [...prevTextValues];
      newTextValues.push('', ''); // เพิ่มข้อความว่างสำหรับ 2 ช่องใหม่
      return newTextValues;
    });
  };

  const deleteSelectedInput = () => {
    if (selectedInput !== null) {
      setInputs(inputs.filter((_, index) => index !== selectedInput));
      setSelectedInput(null);
    } else {
      alert("กรุณาเลือกช่องข้อความที่ต้องการลบ");
    }
  };

  const toggleThermometerAndButtonColor = () => {
    setThermometerImage(isYellow ? greenThermometer : yellowThermometer);
    setIsYellow(!isYellow);
  };

  const toggleThermometerOrange = () => {
    setThermometerImage(isOrange ? greenThermometer : orangeThermometer);
    setIsOrange(!isOrange);
  };

  const toggleThermometerRed = () => {
    setThermometerImage(isRed ? greenThermometer : redThermometer);
    setIsRed(!isRed);
  };
  
    // ฟังก์ชันสำหรับคำนวณ Downtime
const calculateDowntime = (faultTime) => {
  if (!faultTime) return '';

  const faultDate = new Date(faultTime);
  const currentDate = new Date();

  // ตรวจสอบว่า Fault Time ถูกต้องหรือไม่
  if (isNaN(faultDate.getTime())) return 'รูปแบบเวลาผิด';

  // คำนวณเวลาต่าง (เป็นมิลลิวินาที)
  const difference = currentDate - faultDate;

  // แปลงเป็นชั่วโมงและนาที
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} ชั่วโมง ${minutes} นาที`;
};

// ใช้ useEffect เพื่ออัปเดตค่า downTime อัตโนมัติเมื่อ faultTime เปลี่ยนแปลง
useEffect(() => {
  if (faultTime) {
      const downtimeResult = calculateDowntime(faultTime);
      setDownTime(downtimeResult);
  }
}, [faultTime]);

  // ฟังก์ชันสำหรับการบันทึกข้อมูล
  const handleSave = () => {
    const newData = {
      id: input,
      name: input2,
      province,
      ticketNo,
      upTime,
      downTime,
      faultTime,
      textValues: [...textValues],
      selectedCells: [...selectedCells],
      selectedValue,
      isYellow,
      isOrange,
      isRed,
      thermometerImage,
      inputs: [...inputs],
    };
    console.log("Saving data:", newData);
    if (onSave) {
      onSave(newData);
    } else {
      console.error("onSave function is not defined");
    }
  };
  const handleInputChange = (index, value) => {
    setTextValues((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
    });
  };  

        <InputList
          inputs={inputs}
          textValues={textValues}
          setTextValues={(index, value) => handleInputChange(index, value)}
       />

  
  return (
    <div ref={formRef} className="form-container">
      <HeaderInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input" className="header" />
      <HeaderInput value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Input 2" className="header-input2" />

      <div className="gray-area">
        <img src={thermometerImage} alt="Thermometer" className="thermometer-icon" />
        <FormRow label="Ticket No." inputName="ticketNo" value={ticketNo} onChange={(e) => setTicketNo(e.target.value)} />
        <FormRow label="จังหวัดที่รับผิดชอบ" inputName="province" value={province} onChange={(e) => setProvince(e.target.value)} />
        <FormRow label="Fault Time" inputName="faultTime" isDateTimePicker={true} value={faultTime} onChange={(e) => setFaultTime(e.target.value)} />
        <FormRow label="Up Time" inputName="upTime" value={upTime} onChange={(e) => setUpTime(e.target.value)} />
        <FormRow label="Down Time" inputName="downTime" value={downTime} readOnly={true} />
      </div>

      <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <InputList
        inputs={inputs}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
        selectedData={selectedData}
        setTextValues={setTextValues}
        textValues={textValues}
      />
      <ImageTable
        toggleThermometer={toggleThermometerAndButtonColor}
        toggleThermometerOrange={toggleThermometerOrange}
        toggleThermometerRed={toggleThermometerRed}
        selectedData={selectedData}
        setSelectedCells={setSelectedCells}
        selectedCells={selectedCells}
      />

      <ButtonContainer
        addInput={addInput}
        deleteSelectedInput={deleteSelectedInput}
        handleSave={handleSave}
        handleCaptureAndCopy={handleCaptureAndCopy}
        toggleThermometerAndButtonColor={toggleThermometerAndButtonColor}
        isYellow={isYellow}
        handleDownloadCapture={handleDownloadCapture}
      />
    </div>
  );
};

export default FormComponent;

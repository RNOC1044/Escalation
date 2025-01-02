import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';
import { SERVER_URL } from './config/HTTP_API';

const NewFormPage = ({ onSave, goToHomePage, editData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedData, setSelectedData] = useState(editData || null);

  // ใช้ useEffect สำหรับการตรวจสอบและเติมข้อมูลจาก editData
  useEffect(() => {
    if (editData) {
      setSelectedData(editData);
    }
  }, [editData]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อความค้นหา
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // ฟังก์ชันสำหรับการค้นหาข้อมูลผ่าน API
  const handleSearchClick = async () => {
    if (!searchTerm.trim()) {
      alert('กรุณากรอกคำค้นหา'); // แจ้งเตือนผู้ใช้ถ้าไม่มีข้อความค้นหา
      return;
    }

    try {
      const response = await axios.get(SERVER_URL +'search', { params: { query: searchTerm } });    
      console.log(response);    

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง'); // แจ้งเตือนเมื่อมีข้อผิดพลาด
    }
  };

  // ฟังก์ชันเมื่อคลิกเลือก ID จากผลลัพธ์การค้นหา
  const handleClickID = (data) => {
    const formattedData = {
      ...data,
      id: data.customer_id, // กำหนด customer_id ให้กับ id
    };
    setSelectedData(formattedData);
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูล
  const handleSave = (newData) => {
    onSave(newData);
  };

  // หากมีข้อมูลที่ต้องการแก้ไขหรือข้อมูลที่เลือกจากการค้นหา แสดง FormComponent
  if (selectedData) {
    return (
      <div>
        <h2>{editData ? 'Edit Form' : 'New Form'}</h2>
        <FormComponent selectedData={selectedData} onSave={handleSave} />
        <button onClick={goToHomePage} style={{ marginTop: '20px' }}>Back</button>
      </div>
    );
  }

  // แสดงส่วนของการค้นหาเมื่อยังไม่มีข้อมูลที่เลือก
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', height: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>New Form</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="ค้นหา..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleSearchClick}>ค้นหา</button>
      </div>

      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
              onClick={() => handleClickID(result)}
            >
            Customer_id: {result.customer_id}
            </span>
            <br />
            NAME: {result.name}
            <br />
            AREA: {result.area}
          </li>
        ))}
      </ul>

      <button onClick={goToHomePage}>Back</button>
    </div>
  );
};

export default NewFormPage;

import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import NewFormPage from './NewFormPage';
import './App.css'; 

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("Loaded data from localStorage:", parsedData);
      setData(parsedData);
    }
  }, []);

  const goToFormPage = () => {
    setCurrentPage('form');
  };

  const goToHomePage = () => {
    setCurrentPage('home');
    setEditData(null); // รีเซ็ตข้อมูลการแก้ไข
  };

  const handleSaveData = (newData) => {
    let updatedData;
    const currentTime = new Date().toLocaleTimeString('en-GB'); 
    if (editData) {
      // กรณีแก้ไขข้อมูลเดิม
      updatedData = data.map((item, index) =>
        index === editData.index ? { ...newData, lastEditedTime: currentTime } : item
      );
    } else {
      // กรณีบันทึกข้อมูลใหม่
      updatedData = [...data, { ...newData, lastEditedTime: currentTime }];
    }
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    goToHomePage();
  };

  const handleEditData = (index) => {
    const currentTime = new Date().toLocaleTimeString('en-GB'); // ใช้ 'en-GB' แสดงเวลาแบบ 24 ชั่วโมง
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, lastEditedTime: currentTime } : item
    );
    setData(updatedData); // อัปเดตข้อมูลใน state
    localStorage.setItem('formData', JSON.stringify(updatedData)); // บันทึกข้อมูลลง localStorage
    setEditData({ ...data[index], index }); // ใช้ข้อมูลเดิมจาก state
    goToFormPage(); // ย้ายไปหน้าฟอร์ม
  };

  const handleDeleteData = (index) => {
    const updatedData = data.filter((_, i) => i !== index); // ลบข้อมูลจาก array โดยใช้ index
    setData(updatedData); // อัปเดต state
    localStorage.setItem('formData', JSON.stringify(updatedData)); // บันทึกข้อมูลใหม่ลง localStorage
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <div className="sidebar">
            <h3>Menu</h3>
            <ul>
                <li style={{ cursor: 'pointer', color: 'blue' }} onClick={goToFormPage}>
                    New Form
                </li>
            </ul>
        </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {currentPage === 'home' ? (
          <HomePage data={data} onDelete={handleDeleteData} onEdit={handleEditData} />
        ) : (
          <NewFormPage goToHomePage={goToHomePage} onSave={handleSaveData} editData={editData} />
        )}
      </div>
    </div>
  );
};

export default App;

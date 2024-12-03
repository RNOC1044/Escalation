import React from 'react';

const TestPage = ({ id }) => {

  const goToHomePage = () => {
    // ฟังก์ชันสำหรับกลับไปยังหน้าแรก
    window.location.href = '/'; // นำไปยังเส้นทางของหน้าแรก
  };
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', height: '100%' }}>
      <h1>Test Page</h1>
      <p>ID ที่คุณเลือก: {id}</p> {/* แสดง ID ที่ได้รับ */}
      
      {/* ฟอร์มง่าย ๆ */}
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" style={{ margin: '10px' }} /><br />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" style={{ margin: '10px' }} /><br />
        
        <button type="submit">Submit</button>
      </form>

      {/* ปุ่มกลับไปหน้าแรก */}
      <button
        onClick={goToHomePage}
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '20px',
          padding: '10px 20px',
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#f4f4f4'
        }}
      >
        Back
      </button>
    </div>
  );
};

export default TestPage;

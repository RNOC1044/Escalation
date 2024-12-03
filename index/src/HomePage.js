import React from 'react';
import './HomePage.css';

const HomePage = ({ data, onDelete, onEdit }) => {
  console.log("Data received in HomePage:", data);
  return (
    <div>
      <h1>Escalation Form</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ลำดับ</th> {/* หัวข้อสำหรับลำดับ */}
            <th>Ticket No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>จังหวัดที่รับผิดชอบ</th>
            <th className="up-time">Up Time</th>
            <th className="down-time">Down Time</th>
            <th>Last Edit</th> {/* เพิ่มหัวข้อใหม่ */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ backgroundColor: item.upTime && !isNaN(item.upTime) ? 'lightgreen' : 'transparent' }}>
            <td style={{color: 'red'}}>{index + 1}</td>
            <td>{item.ticketNo}</td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.province}</td>
            <td>{item.upTime}</td>
            <td>{item.downTime}</td>
            <td>{item.lastEditedTime || 'N/A'}</td>
            <td>
              <button onClick={() => onEdit(index)} style={{ color: 'blue', cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={() => onDelete(index)} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}>
                Delete
              </button>
            </td>
          </tr>                    
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;

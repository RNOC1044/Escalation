import React from 'react';
import './HomePage.css';

const HomePage = ({ data, onDelete, onEdit }) => {
  console.log("Data received in HomePage:", data);
  return (
    <div>
      <h1 style={{ textAlign: 'center', background:'#ffff66', fontSize:'40px'}}>Escalation Form</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th className='order'>ลำดับ</th> 
            <th className='tk'>Ticket.</th>
            <th className='id'>ID</th>
            <th className='name'>Name</th>
            <th className='ar'>จังหวัด</th>
            <th className="up-time">Up Time</th>
            <th className="down-time">Down Time</th>
            <th className='edit'>Last Edit</th> 
            <th className='action'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ backgroundColor: item.upTime && !isNaN(item.upTime) ? 'lightgreen' : 'transparent' }}>
            <td style={{ color: 'red', textAlign: 'center' }}>{index + 1}</td>
            <td>{item.ticketNo}</td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.province}</td>
            <td>{item.upTime}</td>
            <td>{item.downTime}</td>
            <td>{item.lastEditedTime || 'N/A'}</td>
            <td className="action-buttons">
              <button onClick={() => onEdit(index)} style={{ background:'#6495ed',color: 'white', cursor: 'pointer', marginRight: '10px' }}> 
                Edit
              </button>
              <button onClick={() => onDelete(index)} style={{ background:'#f08080 ',color: 'black', cursor: 'pointer' }}>
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

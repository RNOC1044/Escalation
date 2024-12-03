import React from 'react';
import './styles.css';
import FormComponent from './FormComponent';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Escalation Form</h1> 
      </header>
      <main className="form-container">
        <ErrorBoundary>
          <FormComponent /> {/* คอมโพเนนต์ฟอร์มหลัก */}
        </ErrorBoundary>
      </main>
      <footer className="app-footer">
        {/* สามารถเพิ่มเนื้อหาใน footer ได้ */}
      </footer>
    </div>
  );
}

export default App;

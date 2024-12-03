import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // อัปเดตสถานะเพื่อแสดง UI สำรองเมื่อเกิดข้อผิดพลาด
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // สามารถบันทึกข้อผิดพลาดไปยังเซิร์ฟเวอร์หรือ console ได้
        console.error("Error caught in ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            // สามารถปรับข้อความนี้เพื่อให้เหมาะสมกับ UI ได้
            return <h2>Something went wrong. Please try again later.</h2>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;

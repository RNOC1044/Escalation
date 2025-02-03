const ButtonContainer = ({
  addInput,
  deleteSelectedInput,
  handleSave,
  handleCaptureAndSendToTelegram, // รับฟังก์ชันที่ส่งภาพไปยัง Telegram
  handleDownloadCapture, // รับฟังก์ชันดาวน์โหลดเป็น props
}) => {

  return (
    <div className="button-container">
      <button onClick={addInput} style={{ marginTop: '20px',fontSize:'18px', background:'#2a52be', color:'wheat' }}>เพิ่มช่องข้อความ</button>
      <button onClick={deleteSelectedInput} style={{ fontSize:'18px', background:'#c40233', color:'wheat' }}>ลบช่องที่เลือก</button>
      <button className="default-button" onClick={handleSave}  style={{ fontSize:'18px', background:'#c0c0c0', color:'black' }}>Save</button> 
      <button className="copy-button" onClick={handleCaptureAndSendToTelegram} style={{ marginLeft: 'auto',fontSize:'18px', background:'#2a52be', color:'wheat' }}>
      Sent To Telegram Bot
      </button>
      <button className="download-button" onClick={handleDownloadCapture} style={{ fontSize:'18px', background:'#32cd32 ', color:'black' }}>
      Download To Image
      </button>
    </div>
  );
};
//
export default ButtonContainer;

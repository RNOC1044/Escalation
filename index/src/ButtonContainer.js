const ButtonContainer = ({
  addInput,
  deleteSelectedInput,
  handleSave,
  handleCaptureAndSendToTelegram, // รับฟังก์ชันที่ส่งภาพไปยัง Telegram
  handleDownloadCapture, // รับฟังก์ชันดาวน์โหลดเป็น props
}) => {

  return (
    <div className="button-container">
      <button onClick={addInput}>เพิ่มช่องข้อความ</button>
      <button onClick={deleteSelectedInput}>ลบช่องที่เลือก</button>
      <button className="default-button" onClick={handleSave}>Save</button> 
      <button className="copy-button" onClick={handleCaptureAndSendToTelegram} style={{ marginLeft: 'auto' }}>
      Sent To Telegram Bot
      </button>
      <button className="download-button" onClick={handleDownloadCapture}>
      Download To Image
      </button>
    </div>
  );
};
//
export default ButtonContainer;

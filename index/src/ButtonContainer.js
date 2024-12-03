const ButtonContainer = ({
  addInput,
  deleteSelectedInput,
  handleSave,
  handleCaptureAndCopy,
  handleDownloadCapture, // รับฟังก์ชันดาวน์โหลดเป็น props
}) => {

  return (
    <div className="button-container">
      <button onClick={addInput}>เพิ่มช่องข้อความ</button>
      <button onClick={deleteSelectedInput}>ลบช่องที่เลือก</button>
      <button className="default-button" onClick={handleSave}>บันทึก</button> 
      <button
        className="copy-button"
        onClick={handleCaptureAndCopy}
        style={{ marginLeft: 'auto' }}
      >
        Copy to clipboard
      </button>
      <button className="download-button" onClick={handleDownloadCapture}>
        ดาวน์โหลดภาพ
      </button>
    </div>
  );
};

export default ButtonContainer;

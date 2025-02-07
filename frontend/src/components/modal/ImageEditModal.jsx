//eslint-disable-next-line
const ImageEditModal = ({ isOpen, onClose, onUpload, imageType }) => {
  // eslint-disable-next-line
  const fileInputRef = React.useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 이미지 파일 검증
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      // 파일 크기 검증 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      onUpload(file);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {imageType === "banner" ? "배너 이미지 변경" : "프로필 이미지 변경"}
        </h2>

        <div className="space-y-4">
          <p className="text-gray-600 text-sm">JPG, PNG 파일 (최대 5MB)</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
          >
            이미지 선택
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditModal;

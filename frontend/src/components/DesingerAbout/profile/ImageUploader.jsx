import { useState, useRef } from "react";
import { Upload } from "lucide-react";

export default function ImageUploader({
  imageType,
  defaultImage,
  onImageSelected,
  className,
}) {
  const [image, setImage] = useState(defaultImage || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일을 상태에 저장
    setSelectedFile(file);

    // 이미지 미리보기를 위한 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // 부모 컴포넌트에 선택된 파일 정보 전달
    onImageSelected(imageType, file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`relative ${className || ""}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      {image ? (
        <div className="relative w-full h-full">
          <img
            src={image}
            alt={`${imageType} 이미지`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleClick}
            className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="w-full h-full flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">이미지 업로드</span>
        </div>
      )}
    </div>
  );
}

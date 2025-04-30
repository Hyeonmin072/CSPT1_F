import React, { useRef } from "react";
import ImageEditModal from "../../modal/ImageEditModal";
import { useState } from "react";
//eslint-disable-next-line
const ProfileImageEdit = ({ profileImage, onImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div
        className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleImageClick}
      >
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-medium">이미지 변경</span>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <ImageEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={onImageChange}
        imageType="profile"
      />
    </div>
  );
};

export default ProfileImageEdit;

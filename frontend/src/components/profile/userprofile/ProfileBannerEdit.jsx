import ImageEditModal from "../../modal/ImageEditModal";
import { useState } from "react";
//eslint-disable-next-line
const ProfileBannerEdit = ({ bannerImage, onImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-48 bg-teal-100 rounded-lg overflow-hidden relative group">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div
          onClick={() => setIsModalOpen(true)}
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <span className="text-white text-lg">배너 이미지 변경</span>
        </div>
      </div>
      <ImageEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={onImageChange}
        imageType="banner"
      />
    </>
  );
};

export default ProfileBannerEdit;

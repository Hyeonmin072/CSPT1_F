import ImageEditModal from "../../modal/ImageEditModal";
import { useState } from "react";
//eslint-disable-next-line
const ProfileImageEdit = ({ profileImage, onImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
        <div
          className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center transition-opacity">
            <span className="text-white text-sm">변경</span>
          </div>
        </div>
      </div>
      <ImageEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={onImageChange}
        imageType="profile"
      />
    </>
  );
};

export default ProfileImageEdit;

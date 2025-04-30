import React, { useState } from "react";
import { UserRound, Image } from "lucide-react";
import { selectedDesigner } from "../../../dummydata/DummydbDesigner.jsx";

export default function ProfileEditHeader({
  setBannerImage,
  profileImage,
  setProfileImage,
  bannerImage,
}) {
  // 배너 이미지와 프로필 이미지 상태를 초기화
  const [bannerImageState, setBannerImageState] = useState(bannerImage);
  const [profileImageState, setProfileImageState] = useState(profileImage);

  // 이미지 변경 로직
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      // File 객체를 그대로 저장
      setImage(file);

      // 미리보기를 위한 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        // 미리보기 URL은 사용하지 않고 File 객체만 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event, setImage) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      // File 객체를 그대로 저장
      setImage(file);
    }
  };

  // 이미지 미리보기 URL 생성
  const getImagePreview = (image) => {
    if (!image) return null;

    // 이미 File 객체인 경우
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    // URL 문자열인 경우
    return image;
  };

  return (
    <>
      {/* 배경 이미지 */}
      <div
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, setBannerImage)}
        className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center border-2 border-gray-400"
      >
        {bannerImage ? (
          <img
            src={getImagePreview(bannerImage)}
            alt="Designer Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Image className="w-20 h-20 text-gray-500" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="bannerImageInput"
          onChange={(event) => handleImageChange(event, setBannerImage)}
        />
        <label
          htmlFor="bannerImageInput"
          className="cursor-pointer absolute top-0 left-0 w-full h-full"
        ></label>
      </div>

      {/* 프로필 이미지 */}
      <div
        className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, setProfileImage)}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profileImageInput"
          onChange={(event) => handleImageChange(event, setProfileImage)}
        />
        <label htmlFor="profileImageInput" className="cursor-pointer">
          {profileImage ? (
            <img
              src={getImagePreview(profileImage)}
              alt="Designer Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <UserRound className="w-16 h-16 text-gray-500" />
            </div>
          )}
        </label>
      </div>
    </>
  );
}

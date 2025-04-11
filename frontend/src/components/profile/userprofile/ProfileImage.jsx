import React from "react";

//eslint-disable-next-line
const ProfileImage = ({ profileImage }) => {
  return (
    <div className="relative">
      <div className="w-40 h-40 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileImage;

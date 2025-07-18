import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ProfileHeader from "./ProfileHeader.jsx";
import LeftSection from "./LeftSection.jsx";
import MiddleSection from "./MiddleSection.jsx";
import RightSection from "./RightSection.jsx";

export default function DesignerProfile(props) {
  const {
    name,
    nickName,
    description,
    image,
    age,
    gender,
    like,
    email,
    tel,
    backgroundImage,
    isViewMode,
    isSubmitting,
    onUpdate,
    reviews,
    isLike,
  } = props;

  // props가 제대로 넘어오지 않았을 경우 처리
  if (!name || !email) {
    return <p className="text-center mt-10">디자이너 정보를 불러오는 중입니다... 🌀</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-10 mt-2">
      {/* Header */}
      <div className="bg-white w-full h-[380px] relative border-b-2">
        <ProfileHeader
          name={name}
          nickName={nickName}
          description={description}
          image={image}
          age={age}
          gender={gender}
          likeCnt={like}
          email={email}
          tel={tel}
          backgroundImage={backgroundImage}
          reviews={reviews}
          isViewMode={isViewMode}
          isLike={isLike}
        />
      </div>

      <div className="grid grid-cols-12 gap-4 mt-10">
        <div className="col-span-3 bg-white p-4 rounded-lg">
          <LeftSection description={description} isViewMode={isViewMode} email={email} />
        </div>
        <div className="col-span-6 bg-white p-4 rounded-lg h-full">
          <MiddleSection reviewData={reviews} />
        </div>
        <div className="col-span-3 p-6 rounded-lg bg-gray-100 max-h-[390px]">
          <RightSection name={name} age={age} gender={gender} email={email} tel={tel} />
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Image } from "lucide-react";

import ProfileEditHeader from "./ProfileEditHeader.jsx";

export default function DesignerProfileEdit({
  name,
  email,
  tel,
  description,
  image,
  backgroundImage,
}) {
  const navigate = useNavigate();

  // 상태 초기화: props에서 가져오기
  const [profileImage, setProfileImage] = useState(image);
  const [bannerImage, setBannerImage] = useState(backgroundImage);
  const [introduction, setIntroduction] = useState(description || "");
  const [nickname, setNickname] = useState("");
  const [emailPrefix, setEmailPrefix] = useState(
    email ? email.split("@")[0] : ""
  );
  const [domain, setDomain] = useState(email ? email.split("@")[1] : "");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [telephone, setTelephone] = useState(tel || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 기본 제공 도메인 목록
  const basicDomains = ["gmail.com", "naver.com", "daum.net"];

  const handleEmailChange = (e) => {
    setEmailPrefix(e.target.value);
  };

  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === "custom.com") {
      setIsCustomDomain(true);
      setDomain("");
    } else {
      setIsCustomDomain(false);
      setDomain(selectedDomain);
    }
  };

  const handleCustomDomainChange = (e) => {
    setDomain(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-10">
      {/* Header */}
      <div className="bg-white w-full h-[300px] relative">
        <ProfileEditHeader
          setBannerImage={setBannerImage}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          bannerImage={bannerImage}
        />
      </div>

      {/* Body */}
      <div className="mt-20">
        <form>
          {/* 이름 입력 */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
              placeholder="디자이너 이름을 입력하세요"
              readOnly
            />
          </div>

          {/* 닉네임 입력 */}
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <div className="flex flex-row space-x-4">
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
                placeholder="디자이너 닉네임을 입력하세요"
              />
              <button className="w-[200px] bg-green-600 rounded-lg text-white">
                중복확인
              </button>
            </div>
          </div>

          {/* 이메일 입력 */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="text"
                id="email"
                name="email"
                value={emailPrefix}
                onChange={handleEmailChange}
                className="flex-1 bg-[#F9F9F9] px-3 py-2 rounded-lg"
                placeholder="이메일 입력"
              />
              <span className="mx-2 text-gray-700 text-xl">@</span>
              {isCustomDomain ? (
                <input
                  type="text"
                  id="custom-domain"
                  name="custom-domain"
                  value={domain}
                  onChange={handleCustomDomainChange}
                  className="bg-[#F9F9F9] px-3 py-2 rounded-lg w-[240px]"
                  placeholder="직접 입력"
                />
              ) : (
                <select
                  id="domain"
                  name="domain"
                  value={domain}
                  onChange={handleDomainChange}
                  className="bg-[#F9F9F9] px-3 py-2 rounded-lg w-[240px]"
                >
                  {!basicDomains.includes(domain) && (
                    <option value={domain}>{domain}</option>
                  )}
                  {basicDomains.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="custom.com">직접 입력</option>
                </select>
              )}
              <button className="px-2 py-2 rounded-lg w-[120px] text-white bg-green-600">
                이메일 확인
              </button>
            </div>
          </div>

          {/* 연락처 입력 */}
          <div className="mb-4">
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              연락처
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
              placeholder="연락처를 입력하세요"
            />
          </div>

          {/* 비밀번호 관련 입력 */}
          <div className="flex flex-row w-full space-x-4">
            <div className="mb-4 w-1/3">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                기존 비밀번호
              </label>
              <input
                type="password"
                id="current-password"
                name="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
                placeholder="기존 비밀번호 입력"
              />
            </div>
            <div className="mb-4 w-1/3">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                새 비밀번호
              </label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
                placeholder="새 비밀번호 입력"
              />
            </div>
            <div className="mb-4 w-1/3">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                새 비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9]"
                placeholder="비밀번호 확인"
              />
            </div>
          </div>

          {/* 소개글 */}
          <section className="mb-4">
            <label
              htmlFor="introduce"
              className="block text-sm font-medium text-gray-700"
            >
              소개글
            </label>
            <textarea
              id="introduce"
              name="introduce"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="mt-1 block w-full h-48 px-3 py-2 rounded-md shadow-sm bg-[#F9F9F9] resize-none"
              placeholder="자신을 소개하는 글을 작성해주세요."
            />
          </section>
        </form>

        {/* 버튼 섹션 */}
        <div className="flex flex-row justify-center space-x-4">
          <button
            type="button"
            className="w-40 bg-[#C6FFC8] text-green-600 py-2 px-4 rounded-md hover:bg-[#A5FFA8] focus:outline-none"
            onClick={() => navigate("/profile")}
          >
            취소하기
          </button>
          <button
            type="submit"
            className="w-40 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

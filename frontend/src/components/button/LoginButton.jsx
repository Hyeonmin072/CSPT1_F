import React, { useState } from "react";
import SignIntegration from "../modal/signinup/SignIntergration";
export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-[#70EFDE] text-black rounded transition-colors duration-200 font-bold"
        onClick={openModal}
      >
        로그인
      </button>

      {/* 모달 컴포넌트 */}
      <SignIntegration isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

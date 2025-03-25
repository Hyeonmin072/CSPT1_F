import React, { useState } from "react";
import SignIntegration from "../sign/SignIntergration";

export default function RegisterButton() {
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
        className="px-4 py-2 bg-white text-black rounded transition-colors duration-200 font-bold hover:bg-gray-100"
        onClick={openModal}
      >
        회원가입
      </button>

      {/* Sign Integration 모달 */}
      <SignIntegration isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

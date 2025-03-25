import React, { useState } from "react";
import SignUpContainer from "../sign/SignIntergration";

const LoginButton = () => {
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
        onClick={openModal}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        로그인
      </button>
      <SignUpContainer isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LoginButton;

import { useState } from "react";
import CouponModal from "../modal/coupon/CouponModal";

const MyCouponButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-6 py-2 text-teal-500 rounded-lg hover:text-teal-600 transition-colors bg-teal-100 hover:bg-teal-200"
      >
        내 쿠폰함
      </button>

      <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MyCouponButton;

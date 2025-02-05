import React, { useState } from 'react';
import CouponModal from '../../components/coupon/CouponModal';

export default function CouponModalPage() {
    const [isModalOpen, setIsModalOpen] = useState(true); // 시작 시 모달창을 열어둠

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <CouponModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

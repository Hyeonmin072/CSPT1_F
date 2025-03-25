import { useState } from 'react';
import CheckDetailModal from "../modal/reservationcheck/CheckDetailModal.jsx";
import CheckList from "./CheckList.jsx";
import CheckHeader from "./CheckHeader.jsx";

import reviewEX from "../../assets/hairshop/reviewEX.jpg";


export default function ReservationCheck() {
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [selectedYear, setSelectedYear] = useState('2024');
    const [searchTerm, setSearchTerm] = useState('');

    // 임시 리스트
    const reservations = [
        { id: 1, date: '2024-5-7', salonName: 'HAIRISM', designer: 'Jane Doe', menu: 'Haircut', status: '예약완료', price: '100000', title: '컷트', imageUrl: reviewEX, finalPrice: '90000', selectedCoupon: '10% 할인 쿠폰', selectedMembership: 'Gold' },
        { id: 2, date: '2024-5-15', salonName: 'Hair Heaven', designer: 'John Smith', menu: 'Color', status: '예약취소', price: '120000', title: '컬러링', imageUrl: reviewEX, finalPrice: '120000', selectedCoupon: '5% 할인 쿠폰', selectedMembership: 'Silver' },
        { id: 3, date: '2025-3-10', salonName: 'Hair Magic', designer: 'Alice Brown', menu: 'Perm', status: '예약완료', price: '90000', title: '펌', imageUrl: reviewEX, finalPrice: '85000', selectedCoupon: '없음', selectedMembership: 'Bronze' },
        { id: 4, date: '2025-7-10', salonName: 'Hair Magic', designer: 'Alice Brown', menu: 'Perm', status: '예약완료', price: '90000', title: '펌', imageUrl: reviewEX, finalPrice: '85000', selectedCoupon: '없음', selectedMembership: 'Bronze' },
        { id: 5, date: '2024-10-15', salonName: 'Hair Magic', designer: 'Alice Brown', menu: 'Perm', status: '예약완료', price: '90000', title: '펌', imageUrl: reviewEX, finalPrice: '85000', selectedCoupon: '없음', selectedMembership: 'Bronze' },
        { id: 6, date: '2024-11-23', salonName: 'Hair Magic', designer: 'Alice Brown', menu: 'Perm', status: '예약완료', price: '90000', title: '펌', imageUrl: reviewEX, finalPrice: '85000', selectedCoupon: '없음', selectedMembership: 'Bronze' },
    ];

    // id를 기준으로 정렬
    const sortedReservations = reservations.sort((a, b) => b.id - a.id);

    const filteredReservations = sortedReservations.filter(reservation =>
        reservation.date.startsWith(selectedYear)
    );

    // 검색어에 따라 필터링된 예약 목록
    const filteredSearch = reservations
        .filter(reservation =>
            reservation.date.startsWith(selectedYear) &&
            (reservation.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.designer.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${month}-${day}`;
    };

    const handleRowClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const closeModal = () => {
        setSelectedReservation(null);
    };

    return (
        <div className="container mx-auto px-10 m-10">
            <div className="mb-4 pb-4 flex items-center">
                <CheckHeader
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            <div className="border rounded-lg p-3 m-10 overflow-x-auto">
                <CheckList
                    handleRowClick={handleRowClick}
                    filteredReservations={filteredSearch}
                    formatDate={formatDate}
                />

            </div>
            {selectedReservation && (
                <CheckDetailModal reservation={selectedReservation} onClose={closeModal}/>
            )}
        </div>
    );
}

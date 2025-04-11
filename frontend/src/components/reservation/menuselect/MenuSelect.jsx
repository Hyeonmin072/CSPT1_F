import { useState, useRef } from "react";

import MenuHeader from "./MenuHeader.jsx";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import MenuSelectModal from "../../modal/menu/MenuSelectModal.jsx"

import d1 from "../../../assets/designer/d1.png"

export const reservation = {
    salonName: '포레포레 헤어 고속터미널점',
    designer: '디자이너 유용준',
    date: '25년 1월 15일 15시 30분',
    menu: {
        추천메뉴: [
            {
                title: '[EVENT]그로밋쌤 복구 매직',
                price: '195,000',
                originalPrice: '380,000',
                description: '큰 틀방쌤만의 레시피로 자신있게 추천합니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '[컬러기획전] 복구 염색',
                price: '190,000',
                originalPrice: '380,000',
                description: '시그니처 Repaor keratin과 프리미엄 염모제를 사용합니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '[EVENT]CS클럽 복구 + 르미네상스클리닉',
                price: '150,000',
                originalPrice: '300,000',
                description: '스타일을 상담을 통하여 최적의 시술 이미지를 찾고 제안드립니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '[EVENT]컷 + 포인트펌 + 다운펌',
                price: '70,000',
                originalPrice: '90,000',
                description: '펌 디자인을 유지하면서 앞머리와 옆머리를 손질할 때 좋습니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
        커트: [
            {
                title: '남성컷',
                price: '30,000',
                description: '남성 헤어컷 서비스입니다.',
                target: '남성',
                cutOption: '커트포함',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '여성컷',
                price: '40,000',
                description: '여성 헤어컷 서비스입니다.',
                target: '여성',
                cutOption: '커트포함',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
        펌: [
            {
                title: '일반펌',
                price: '80,000',
                description: '일반 펌 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '디지털펌',
                price: '120,000',
                description: '디지털 펌 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
        염색: [
            {
                title: '전체염색',
                price: '90,000',
                description: '전체 염색 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '뿌리염색',
                price: '60,000',
                description: '뿌리 염색 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
        클리닉: [
            {
                title: '모발 클리닉',
                price: '100,000',
                description: '모발 클리닉 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '두피 클리닉',
                price: '90,000',
                description: '두피 클리닉 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
        스타일링: [
            {
                title: '드라이',
                price: '20,000',
                description: '드라이 스타일링 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
            {
                title: '업스타일',
                price: '50,000',
                description: '업스타일 서비스입니다.',
                target: '남여공용',
                cutOption: '커트별도',
                shampooOption: '샴푸포함',
                stylingOption: '스타일링포함',
                imageUrl: d1,
            },
        ],
    },
};

export default function MenuSelect() {


    const [selectedTab, setSelectedTab] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const sectionsRef = useRef({
        추천메뉴: null,
        커트: null,
        펌: null,
        염색: null,
        클리닉: null,
        스타일링: null,
    });

    const handleClick = (tab) => {
        setSelectedTab(tab);
        sectionsRef.current[tab]?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <div className="flex items-center justify-between px-10 py-4">
                <MenuHeader />
            </div>

            <div className="lg:flex-row mx-20 gap-6">
                <div className="flex flex-col items-center p-8 w-full">
                    <h2 className="font-bold text-xl mb-6 w-full text-left text-gray-400">예약 정보</h2>
                    <hr className="w-full border-t border-gray-300 mb-6"/>

                    <p className="w-full text-left px-5 pb-2 text-gray-400 font-semibold">헤어살롱: {reservation.salonName}</p>
                    <p className="w-full text-left px-5 pb-2 text-gray-400 font-semibold">디자이너: {reservation.designer}</p>
                    <p className="w-full text-left px-5 pb-2 text-gray-400 font-semibold">날짜: {reservation.date}</p>
                    <hr className="w-full border-t border-gray-300 mb-6 mt-6"/>

                    <MenuTabs selectedTab={selectedTab} handleClick={handleClick} />

                    {Object.keys(reservation.menu).map((tab) => (
                        <div key={tab} ref={(el) => (sectionsRef.current[tab] = el)} className="w-full mt-8 px-5">
                            <h3 className="font-bold text-xl mb-4">{tab}</h3>
                            <hr className="w-full border-t border-gray-300"/>
                            <ul>
                                {reservation.menu[tab].map((item, index) => (
                                    <MenuItems key={index} item={item} onClick={handleItemClick} />
                                ))}
                            </ul>
                        </div>
                    ))}

                    {selectedItem && <MenuSelectModal item={selectedItem} onClose={handleCloseModal} />}
                </div>
            </div>
        </>
    );
}

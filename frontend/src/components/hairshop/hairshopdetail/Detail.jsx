import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
import DesignerInfo from "../../layout/DesignerInfo.jsx";
import DetailHeader from "./DetailHeader.jsx";
import ScrollDetail from "./ScrollDetail.jsx";
import reviewEX from "../../../assets/hairshop/reviewEX.jpg";
import h1 from "../../../assets/hairshop/h1.jpg";

export default function ShopDetail() {
    const navigate = useNavigate();

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.scrollY * -1); // 음수 값으로 변환
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY); // 스크롤에 따라 위치 업데이트
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleWheel = (event) => {
        setScrollPosition((prev) => Math.min(Math.max(prev - event.deltaY, -800), 0)); // 스크롤 한계 설정
    };

    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [coupons] = useState([
        { id: 1, name: "8,500원 할인 쿠폰", description: "5만원 이상 지출 시 사용가능", value: "8500" },
        { id: 2, name: "5,000원 할인 쿠폰", description: "2만원 이상 지출 시 사용가능", value: "5000" },
        { id: 3, name: "2,000원 할인 쿠폰", description: "1만원 이상 지출 시 사용가능", value: "2000" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleCouponSelect = (coupon) => {
        setSelectedCoupons((prevCoupons) => {
            return prevCoupons.some((c) => c.id === coupon.id) ? prevCoupons : [...prevCoupons, coupon];
        });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden"; // 모달 열 때 스크롤 방지
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row px-20 gap-6" onWheel={handleWheel}>
            {/* 왼쪽: 가게 상세 정보 */}
            <div className="flex flex-col px-10 w-3/4 mb-0 bg-white">
                <DetailHeader />
                <div>
                    <img
                        src={h1}
                        alt="샵 사진"
                        className="w-[890px] h-[370px] rounded-lg"
                    />
                    <div className="relative w-full">
                        <ScrollDetail scrollPosition={scrollPosition} handleModalOpen={handleModalOpen} />
                    </div>
                </div>

                {isModalOpen && (
                    <div className="flex z-50 fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700 items-center justify-center">
                        <div className="bg-white p-10 rounded-lg text-center relative w-[600px] h-[600px] z-60">
                            <button
                                onClick={handleModalClose}
                                className="absolute top-3 right-5 text-gray-500"
                            >
                                <X />
                            </button>
                            <h2 className="text-2xl font-bold pb-4">쿠폰 한 번에 보기</h2>
                            <div className="flex-col mt-4 p-5 flex justify-center items-center mx-auto">
                                {coupons.map((coupon) => (
                                    <div
                                        key={coupon.id}
                                        className={`border p-10 mb-4 cursor-pointer ${
                                            selectedCoupons.some((c) => c.id === coupon.id) ? "bg-[#70EFDE]" : "bg-white"
                                        }`}
                                        onClick={() => handleCouponSelect(coupon)}
                                    >
                                        <h3 className="font-bold">{coupon.name}</h3>
                                        <p>{coupon.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 오른쪽: 디자이너 정보 */}
            <div className="flex flex-col w-2/5 min-h-screen top-4">
                <DesignerInfo />
            </div>
        </div>
    );
}

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import h1 from "../../assets/hairshop/h1.jpg";
import logo from "../../assets/logo/logo.png";

import HairSearch from "./HairSearch.jsx";
import HairReservationButton from "../button/HairReservationButton.jsx"

export default function ShopPage({ containerRef }) {
    const shops = [
        { id: 1, name: "HAIRSHOP 1", subject: "subject1", description: "설명 1", image: h1 },
        { id: 2, name: "HAIRSHOP 2", subject: "subject2", description: "설명 2", image: h1 },
        { id: 3, name: "HAIRSHOP 3", subject: "subject3", description: "설명 3", image: h1 },
        { id: 4, name: "HAIRSHOP 4", subject: "subject4", description: "설명 4", image: h1 },
    ];

    const [isVisible, setIsVisible] = useState([]); // isVisible 초기화

    useEffect(() => {
        // shops 배열이 갱신된 후 isVisible 상태를 설정
        setIsVisible(new Array(shops.length).fill(false));

        // 초기 상태를 표시하는 타이머 설정
        setTimeout(() => {
            setIsVisible(new Array(shops.length).fill(true));
        }, 200);
    }, [shops.length]); // shops 배열의 길이가 변경되면 실행되도록 설정

    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
            <div className="flex flex-col items-center gap-6 mx-auto w-full">
                <div className="flex justify-center w-full ">
                    <HairSearch/>
                </div>

                <div ref={containerRef} className="px-4 mt-2 rounded-lg w-[1000px]">
                    <div className="flex flex-col items-center gap-4 mx-auto">
                        {shops.map((shop, index) => (
                            <div
                                key={shop.id}
                                className={`hairshop-item rounded-lg w-full pb-10 duration-300 ease-out 
                                ${isVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{transitionDelay: `${index * 150}ms`}}
                            >
                                <div className="border rounded-lg">
                                    {/* Image */}
                                    <div
                                        className=" h-[250px] w-full rounded-lg"
                                        onClick={() => navigate("/detail")}
                                    >
                                        <img
                                            src={shop.image || logo}
                                            alt="Shop preview"
                                            className="w-full h-[250px] object-cover"
                                        />
                                    </div>

                                    {/* Shop Details */}
                                    <div className="p-4 rounded-lg">
                                        <div
                                            className=" flex items-start space-x-4"
                                            onClick={() => navigate("/detail")}
                                        >
                                            <div className="w-12 h-12 bg-[#E8F7F3] rounded-full"/>
                                            <div>
                                                <h1 className="text-lg font-bold">{shop.name}</h1>
                                                <p className="text-sm text-gray-500">{shop.subject}</p>
                                            </div>
                                        </div>
                                        <div
                                            className="mt-4 mb-10"
                                            onClick={() => navigate("/detail")}
                                        >
                                            <h2 className="text-base font-medium">{shop.description}</h2>
                                        </div>

                                        <div className="flex mt-4">
                                            <HairReservationButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

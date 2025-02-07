import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import h1 from "../../assets/hairshop/h1.jpg";
import logo from "../../assets/logo/logo.png";


import HairSearch from "./HairSearch.jsx";
import ReservationButton from "../button/ReservationButton.jsx"

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
    }, 500);
  }, [shops.length]); // shops 배열의 길이가 변경되면 실행되도록 설정

  const navigate = useNavigate();

  return (
      <div className="max-w-7xl mx-auto px-10 py-4">
        <div className="flex justify-center w-full mb-4">
          <HairSearch />
        </div>

        <div ref={containerRef} className="max-w-7xl p-10 mx-auto px-6 py-4">
          <div className="flex flex-col items-center gap-6 mt-4 border rounded-lg mx-auto">
            {shops.map((shop, index) => (
                <div
                    key={shop.id}
                    className={`hairshop-item border-b-2 p-5 rounded-lg w-full transition-all duration-700 ease-out 
                ${isVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image */}
                  <div
                      className="relative h-[250px] w-full cursor-pointer"
                      onClick={() => navigate("/detail")}
                  >
                    <img
                        src={shop.image || logo}
                        alt="Shop preview"
                        className="w-full h-[250px] object-cover"
                    />
                  </div>

                  {/* Shop Details */}
                  <div className="p-5 rounded-lg">
                    <div
                        className="mt-4 flex items-start space-x-4 cursor-pointer"
                        onClick={() => navigate("/detail")}
                    >
                      <div className="w-12 h-12 bg-[#E8F7F3] rounded-full" />
                      <div>
                        <h1 className="text-lg font-bold">{shop.name}</h1>
                        <p className="text-sm text-gray-500">{shop.subject}</p>
                      </div>
                    </div>
                    <div
                        className="mt-4 mb-10 cursor-pointer"
                        onClick={() => navigate("/detail")}
                    >
                      <h2 className="text-base font-medium">{shop.description}</h2>
                    </div>

                    <div className="flex mt-4">
                      <button
                          className="px-6 py-2 text-black font-semibold rounded-lg hover:bg-[#03DAC5] transition"
                          onClick={() => navigate("/reservation")}
                      >
                        예약하기
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

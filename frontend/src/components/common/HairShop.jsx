import {
  Search,
  LocateFixed,
  MapPin,
} from "lucide-react";
import h1 from "../../assets/hairshop/h1.jpg";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const [isVisible, setIsVisible] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const shops = [
    { id: 1, name: "HAIRSHOP 1", subject: "subject1", description: "설명 1", image: h1 },
    { id: 2, name: "HAIRSHOP 2", subject: "subject2", description: "설명 2", image: h1 },
    { id: 3, name: "HAIRSHOP 3", subject: "subject3", description: "설명 3", image: h1 },
    { id: 4, name: "HAIRSHOP 4", subject: "subject4", description: "설명 4", image: h1 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({
                ...prev,
                [entry.target.dataset.index]: true,
              }));
            }
          });
        },
        { threshold: 0.2 }
    );

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".hairshop-item");
      items.forEach((item, index) => {
        item.dataset.index = index;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-10 py-4">
        <div className="flex justify-center w-full mb-4">
          <div className="flex items-center bg-white rounded-lg shadow-sm py-2 px-4 w-[700px] ">
            <div className="flex items-center">
              <MapPin className="w-5 h-5" />
              <span className="text-sm mx-2">서울 역삼동</span>
              <LocateFixed className="w-5 h-5 bg-red-200 rounded-full p-1" />
            </div>

            <div className="mx-4 h-6 w-px bg-gray-200"></div>

            <div className="flex-1 flex items-center">
              <input type="text" placeholder="가게 이름 검색" className="w-full outline-none" />
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
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
                  <div className="relative h-[250px] w-full cursor-pointer" onClick={() => navigate("/detail")}>
                    <img src={shop.image} alt="Shop preview" className="w-full h-[250px] object-cover" />
                  </div>

                  {/* Shop Details */}
                  <div className="p-5 rounded-lg">
                    <div className="mt-4 flex items-start space-x-4 cursor-pointer" onClick={() => navigate("/detail")}>
                      <div className="w-12 h-12 bg-[#E8F7F3] rounded-full" />
                      <div>
                        <h1 className="text-lg font-bold">{shop.name}</h1>
                        <p className="text-sm text-gray-500">{shop.subject}</p>
                      </div>
                    </div>
                    <div className="mt-4 mb-10 cursor-pointer" onClick={() => navigate("/detail")}>
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

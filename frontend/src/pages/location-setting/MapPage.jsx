import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/common/Header";
import Map from "../../components/location/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MapPage() 
{
    const location = useLocation(); //  전달받은 좌표를 읽는다
    const navigate = useNavigate();
    const [center, setCenter] = useState({
        
        lat: location.state?.lat || 37.5665,  // 좌표가 있으면 좌표값
        lng: location.state?.lng || 126.9780, 
    });
    const [searchInput, setSearchInput] = useState("");
    const mapRef = useRef();

    useEffect(() => {
        if (!location.state?.lat || !location.state?.lng) {
            toast.warning("위치 정보가 없습니다. 잘못된 접근입니다.");
            navigate("/");
        }
    }, [location.state, navigate]);
    const handleSearch = () => {
        if (!window.kakao || !window.kakao.maps) {
            alert("카카오 맵이 아직 로드되지 않았습니다.");
            return;
        }
    
        const places = new window.kakao.maps.services.Places();
    
        places.keywordSearch(searchInput, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const first = data[0];
                const coords = {
                    lat: parseFloat(first.y),
                    lng: parseFloat(first.x),
                };
                setCenter(coords); // 중심 좌표 변경
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 없습니다.");
            } else {
                alert("검색 중 오류가 발생했습니다.");
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col items-center mt-10">
                <div className="mb-6 flex gap-3">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md px-4 py-2 w-80 shadow-sm outline-none transition duration-200"
                        placeholder="주소나 장소를 입력하세요"
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            backgroundColor: "rgba(22, 163, 74, 0.85)", // green-600 투명
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "16px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(21, 128, 61, 0.9)")} // green-700
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(22, 163, 74, 0.85)")}
                    >
                        검색
                    </button>
                </div>

                {/* 지도 */}
                <Map mapRef={mapRef} center={center} setCenter={setCenter} />
            </div>
        </div>
    );
}

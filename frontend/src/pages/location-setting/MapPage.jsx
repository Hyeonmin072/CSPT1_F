import React, { useState, useRef } from "react";
import Header from "../../components/common/Header";
import Map from "../../components/location/Map";

export default function MapPage() {
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [searchInput, setSearchInput] = useState("");
    const mapRef = useRef(); // ✅ 여기서 만든 ref를 아래로 넘김

    const handleCenterChange = (pos) => {
        setCenter(pos);
        console.log("중앙 위치 변경됨:", pos);
    };

    const handleSearch = () => {
        if (!window.kakao || !window.kakao.maps) {
            alert("카카오 맵이 아직 로드되지 않았습니다.");
            return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchInput, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = {
                    lat: parseFloat(result[0].y),
                    lng: parseFloat(result[0].x),
                };
                setCenter(coords); // 이거 바뀌면 Map 컴포넌트에서 center 이동됨
            } else {
                alert("주소를 찾을 수 없습니다.");
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col items-center mt-10">
                {/* 검색바 */}
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border p-2 rounded w-80"
                        placeholder="주소를 입력하세요"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        검색
                    </button>
                </div>

                {/* 지도 */}
                <Map
                    mapRef={mapRef}
                    onCenterChanged={handleCenterChange}
                    searchLocation={center}
                />
            </div>
        </div>
    );
}

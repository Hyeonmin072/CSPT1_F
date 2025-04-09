import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Map.css";
import { updateUserLocation } from "./MapAxios";
import { useNavigate } from "react-router-dom";

export default function Map({ mapRef, center, setCenter }) {
    const [bounceKey, setBounceKey] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return;

        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(center.lat, center.lng),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map;

            window.kakao.maps.event.addListener(map, "idle", () => {
                const newCenter = map.getCenter();
                const newCoords = {
                    lat: newCenter.getLat(),
                    lng: newCenter.getLng(),
                };

                // 이동했을 때만 업데이트
                if (
                    !isNaN(newCoords.lat) &&
                    !isNaN(newCoords.lng) &&
                    (newCoords.lat !== center.lat || newCoords.lng !== center.lng)
                ) {
                    console.log("현재 좌표: ",newCoords)
                    setCenter(newCoords);
                }
            });
        });
    }, []);

    // 외부에서 center가 바뀌면 지도도 따라감
    useEffect(() => {
        if (!mapRef.current) return;
        const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
        mapRef.current.setCenter(moveLatLng);     
        // 마커 애니메이션
        setBounceKey(prev => prev + 1);
    }, [center]);

    // 사용자 위치 업데이트 
    const handleLocationSubmit = async () => {
        try{
            const address = await fetchAddressFromCoords(center.lat, center.lng);
            console.log("주소 정보:", address);
            const response = await updateUserLocation(center.lat, center.lng, address);
            console.log("업데이트 성공", response);
            
            navigate("/hairshop");
        } catch(error){
            console.error("업데이트 중 오류발생:", error);
        }
    };

    // 좌표 -> 주소 변환환
    const fetchAddressFromCoords = async (lat, lng) => {
        return new Promise((resolve, reject) => {
            if(!window.kakao || !window.kakao.maps){
                reject("카카오 지도 API가 로드되지 않았습니다.");
                return;
            }
            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(lat, lng);

            geocoder.coord2Address(coord.getLng(), coord.getLat(),(result) => {
                if(result && result.length > 0){
                    const address = result[0].address.address_name;
                    resolve(address);
                }else{
                    reject("주소 변환 실패");
                }
            });

        });
    }

    

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "1100px",
                height: "520px",
                margin: "0 auto",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                backgroundColor: "#f9fafb",
            }}
        >
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
                filter: "brightness(0.98) saturate(1.05)",
            }}
        ></div>

        {/* 마커 아이콘 */}
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                pointerEvents: "none",
                zIndex: 10,
            }}
        >
            <FaMapMarkerAlt key={bounceKey} size={38} color="#ef4444" className="bounce" />
        </div>

        {/* 하단 버튼 */}
        <div
            style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
            }}
        >
            <button
                style={{
                    backgroundColor: "rgba(34, 197, 94, 0.95)",
                    color: "#fff",
                    padding: "14px 30px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                }}
                onClick={() => {
                    console.log("선택된 좌표:", center);
                    handleLocationSubmit();
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(22, 163, 74, 0.95)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(34, 197, 94, 0.95)")}
            >
                이 위치로 등록하시겠어요?
            </button>
        </div>
    </div>

    );
}

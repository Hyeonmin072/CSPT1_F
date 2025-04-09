import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Map.css";

export default function Map({ mapRef, center, setCenter }) {
    const [bounceKey, setBounceKey] = useState(0);
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

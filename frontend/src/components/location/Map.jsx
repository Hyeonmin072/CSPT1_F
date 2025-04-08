import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function Map({ onCenterChanged, mapRef, searchLocation }) {
    const [centerCoords, setCenterCoords] = useState({ lat: 37.5665, lng: 126.9780 });

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return;

        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(centerCoords.lat, centerCoords.lng),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map;

            window.kakao.maps.event.addListener(map, "idle", () => {
                const center = map.getCenter();
                const newCoords = {
                    lat: center.getLat(),
                    lng: center.getLng(),
                };
                setCenterCoords(newCoords);
                onCenterChanged(newCoords);
            });
        });
    }, []);

    // ✅ searchLocation 이 바뀌면 지도 이동 + 상태 수동 업데이트
    useEffect(() => {
        if (!searchLocation || !mapRef.current) return;
        const { lat, lng } = searchLocation;
        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
        mapRef.current.setCenter(moveLatLng);

    }, [searchLocation]);

    return (
        <div style={{ position: "relative" }}>
            <div id="map" style={{ width: "800px", height: "500px" }}></div>
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
                <MapPin size={30} color="#1e40af" />
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    zIndex: 10,
                }}
            >
                현재 좌표: {centerCoords.lat.toFixed(5)}, {centerCoords.lng.toFixed(5)}
            </div>
        </div>
    );
}

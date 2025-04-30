import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignIntegration from "../sign/SignIntergration";
import { useState, useEffect } from "react";
import { getUserLocation } from "../location/MapAxios";
import { toast } from "react-toastify";

export default function HairSearch({ userLocation = "" }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const fetchAddressFromCoords = async (lat, lng) => {
    return new Promise((resolve, reject) => {
      if (!window.kakao || !window.kakao.maps) {
        reject("카카오 지도 API가 로드되지 않았습니다.");
        return;
      }
      const geocoder = new window.kakao.maps.services.Geocoder();
      const coord = new window.kakao.maps.LatLng(lat, lng);

      geocoder.coord2Address(coord.getLng(), coord.getLat(), (result) => {
        if (result && result.length > 0) {
          const address = result[0].address.address_name;
          resolve(address);
        } else {
          reject("주소 변환 실패");
        }
      });
    });
  };

  useEffect(() => {
    const updateAddress = async () => {
      try {
        const location = await getUserLocation();
        if (location && location.lat && location.lng) {
          const address = await fetchAddressFromCoords(
            location.lat,
            location.lng
          );
          setAddress(address);
        }
      } catch (error) {
        console.error("주소 변환 실패:", error);
      }
    };

    updateAddress();
  }, []);

  const handleMapClick = async () => {
    try {
      const location = await getUserLocation();
      console.log("좌표 응답 데이터:", location);
      if (location && location.lat && location.lng) {
        navigate("/map", {
          state: {
            lat: location.lat,
            lng: location.lng,
          },
        });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.warning("로그인이 필요한 기능입니다 😊");
        setTimeout(() => {
          setIsLoginModalOpen(true);
        }, 200);
      } else {
        toast.error("위치 정보를 불러오지 못했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm py-2 px-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleMapClick}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-sm mx-2">{address || "위치를 등록해주세요"}</span>
      </div>

      {/* 로그인 모달 */}
      <SignIntegration
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

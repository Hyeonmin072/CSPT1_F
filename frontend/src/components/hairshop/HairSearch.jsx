import {
    Search,
    LocateFixed,
    MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignIntegration from "../sign/SignIntergration";
import { useState } from "react";
import { getUserLocation } from "../location/MapAxios";
import { toast } from 'react-toastify';

export default function HairSearch({ userLocation }){

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleMapClick = async () => {
        try{
            const location = await getUserLocation();
            console.log("좌표 응답 데이터:",location);
            if( location && location.lat && location.lng){
                navigate("/map",{
                    state: {
                        lat : location.lat,
                        lng : location.lng,
                    }
                });
            }
        } catch (error){
            if (error.response?.status === 401) {
                toast.warning("로그인이 필요한 기능입니다 😊", {
                    autoClose: 2000
                });
                setTimeout(() => {
                    setIsLoginModalOpen(true);
                }, 2000); // 알림 후 2초 뒤 모달 열기
            } else {
                toast.error("위치 정보를 불러오지 못했습니다.");
            }
        }
       
    };
    return (
        <div className="flex items-center bg-white rounded-lg shadow-sm py-2 px-4 w-[700px] ">
            <div className="flex items-center cursor-pointer" onClick={handleMapClick}>
                <MapPin className="w-5 h-5"/>
                <span className="text-sm mx-2">{userLocation ? userLocation : "위치를 등록해주세요"}</span>
            </div>

            <div className="mx-4 h-6 w-px bg-gray-200"></div>

            <div className="flex-1 flex items-center">
                <input type="text" placeholder="가게 이름 검색" className="w-full outline-none"/>
                <Search className="w-5 h-5 text-gray-400"/>
            </div>
            {/* 로그인 모달 */}
            <SignIntegration
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>

)
}
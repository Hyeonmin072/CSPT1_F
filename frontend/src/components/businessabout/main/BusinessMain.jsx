import {
  Calendar,
  Star,
  Scissors,
  Gift,
  QrCode,
  UserRoundPen,
  DollarSign,
  UserX,
  Settings,
  LogOut,
} from "lucide-react";

import MainIcons from "./MainIcons.jsx";
import CheckInfo from "./CheckInfo.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
import DesignerSetting from "./DesignerSetting.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BusinessMain() {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await axios.get("/shop/main");
        setMainData(response.data);
        console.log("메인 데이터:", response.data);
      } catch (error) {
        console.error("/shop/main 데이터 로딩 실패:", error);
      }
    };
    fetchMainData();
  }, []);

  if (!mainData) return <div>로딩 중...</div>;

  return (
    <div className="p-10 w-full">
      <div className="max-w-6xl mx-auto flex gap-6 mt-20 ">
        {/* 좌측 컨테이너 */}
        <div className="w-2/3 flex flex-col space-y-6 ">
          {/* 주요 아이콘 */}
          <div className="grid grid-cols-3 gap-6 border rounded-lg p-6 bg-white shadow-md h-[340px]">
            <MainIcons />
          </div>

          {/* 정보 박스 */}
          <div className="grid grid-cols-2 gap-4 h-[200px]">
            <CheckInfo
              remainReservation={mainData.remainReservation}
              monthSales={mainData.monthSales}
            />
          </div>
        </div>

        {/* 우측 컨테이너 */}
        <div className="w-1/3 flex flex-col space-y-6">
          {/* 상점 정보 */}
          <div className="bg-white border rounded-lg shadow h-[200px]">
            <ProfileInfo
              shopName={mainData.shopName}
              rating={mainData.rating}
              reviewCount={mainData.reviewCount}
            />
          </div>

          {/* 디자이너 성과 */}
          <div>
            <DesignerSetting
              bestSalesdesignerName={mainData.bestSalesDesignerName}
              bestSalesdesignerEmail={mainData.bestSalesDesignerEmail}
              bestSalesdesignerImage={mainData.bestSalesDesignerImage}
              sales={mainData.sales}
              bestLikedesignerName={mainData.bestLikedesignerName}
              bestLikedesignerEmail={mainData.bestLikedesignerEmail}
              bestLikedesignerImage={mainData.bestLikedesignerImage}
              increasedLikes={mainData.increasedLikes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

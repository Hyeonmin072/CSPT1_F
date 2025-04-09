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

export default function BusinessMain() {
  return (
    <div className="p-10 w-full">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* 좌측 컨테이너 */}
        <div className="w-2/3 flex flex-col space-y-6 ">
          {/* 주요 아이콘 */}
          <div className="grid grid-cols-3 gap-6 border rounded-lg p-6 bg-white shadow-md h-[340px]">
            <MainIcons />
          </div>

          {/* 정보 박스 */}
          <div className="grid grid-cols-2 gap-4 h-[200px]">
            <CheckInfo />
          </div>
        </div>

        {/* 우측 컨테이너 */}
        <div className="w-1/3 flex flex-col space-y-6">
          {/* 상점 정보 */}
          <div className="bg-white border rounded-lg shadow h-[200px]">
            <ProfileInfo />
          </div>

          {/* 디자이너 성과 */}
          <div>
            <DesignerSetting />
          </div>
        </div>
      </div>
    </div>
  );
}

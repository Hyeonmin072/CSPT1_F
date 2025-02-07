// 좌측 로그인폼 로그인할 때 선택하는 유저 선택별 버튼
import BossButton from "./BossButton.jsx";
import GuestButton from "./GuestButton.jsx";
import DesignerButton from "./DesignerButton.jsx";

export default function UserTypeSelectionButtons () {
    return (
    <div className="flex space-x-2 mt-8">
        <BossButton/>
        <GuestButton/>
        <DesignerButton/>
    </div>
    );
}
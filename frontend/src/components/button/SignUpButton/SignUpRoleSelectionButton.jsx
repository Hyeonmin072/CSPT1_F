import SignUpGuestButton from "./SignUpGuestButton.jsx";
import SignUpBossButton from "./SignUpBossButton.jsx";
import SignUpDesignerButton from "./SignUpDesignerButton.jsx";

// 회원가입 창에서 유저 선택 버튼 묶어놓음
export default function SignUpRoleSelectionButton () {
    return (
        <div className="mt-9 space-y-9 flex flex-col items-center">
            <SignUpGuestButton/>
            <SignUpDesignerButton/>
            <SignUpBossButton/>
        </div>
    );
}
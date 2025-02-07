import GoogleLoginButton from "./GoogleLoginButton.jsx";
import KaKaoLoginButton from "./KaKaoLoginButton.jsx";

// 구글 카카오 로그인 버튼 같이 묶어놓음
export default function SocialLoginButton() {
    return (
        <div className="w-full max-w-sm mt-4 space-y-2">
            <GoogleLoginButton/>
            <KaKaoLoginButton/>
        </div>
    );
}
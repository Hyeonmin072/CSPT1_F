import GoogleLoginButton from "./GoogleLoginButton";
import KaKaoLoginButton from "./KaKaoLoginButton";

export default function SocialLoginButton() {
    return (
        <div className="w-full max-w-sm mt-4 space-y-2">
            <GoogleLoginButton/>
            <KaKaoLoginButton/>
        </div>
    );
}
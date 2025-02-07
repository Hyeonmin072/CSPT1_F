import google from "../../images/google.png";

export default function KaKaoLoginButton() {
    return (
        <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-white">
            <img src={google} alt="google Logo" className="w-6 h-6 mr-2"/>
            <span className="text-black">Google 계정으로 로그인</span>
        </button>
    );
}
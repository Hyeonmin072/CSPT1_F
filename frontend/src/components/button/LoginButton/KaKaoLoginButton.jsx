import kakao from "../../../images/kakao.png";

// 파일명 그대로 카카오 로그인 버튼
export default function KaKaoLoginButton() {
    return (
        <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-yellow-400">
            <img src={kakao} alt="kakao Logo" className="w-5 h-5 mr-2 "/>
            <span className="text-black">KaKao 계정으로 로그인</span>
        </button>
    );
}

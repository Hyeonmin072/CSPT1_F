import google from "../../images/google.png";
import kakao from "../../images/kakao.png";
import React from "react";

export default function SocialLoginButton() {
    return (
        <div className="w-full max-w-sm mt-4 space-y-2">
            <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-white">
                <img src={google} alt="google Logo" className="w-6 h-6 mr-2"/>
                <span className="text-black">Google 계정으로 로그인</span>
            </button>
            <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-yellow-400">
                <img src={kakao} alt="kakao Logo" className="w-5 h-5 mr-2 "/>
                <span className="text-black">KaKao 계정으로 로그인</span>
            </button>
        </div>
    );
}
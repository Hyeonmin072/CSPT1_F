import React from "react";
import "./App.css";
import logo from "./images/logo.jpg";
import google from "./images/google.png";
import kakao from "./images/kakao.png";
import { LuUser } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";

function App() {
    return (
        <div className="flex min-h-screen">
            {/* 왼쪽 로그인 폼 */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-white p-10">
                <img src={logo} alt="HAIRISM Logo" className="w-[200px] h-auto mb-4"/>
                <h1 className="text-[6rem] font-bold leading-[0.8]">HAIRISM</h1>
                <h2 className="text-[2.75rem] text-black leading-[1.0] font-semibold">MY HAIR PARTNER</h2>

                {/* 역할 선택 버튼 */}
                <div className="flex space-x-2 mt-8">
                    <button
                        className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black">사장이에요
                    </button>
                    <button
                        className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black">손님이에요
                    </button>
                    <button
                        className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5  rounded-xl hover:bg-black">디자이너에요
                    </button>
                </div>

                {/* 로그인 폼 */}
                <div className="w-full max-w-sm mt-6">
                    <div className="flex items-center mb-3 border rounded-lg">
                        <LuUser size={30} color="black" className="mr-1 ml-4"/>
                        <input type="text"
                               placeholder="유저 이름"
                               className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"/>
                    </div>
                    <div className="flex items-center mb-3 border rounded-lg ">
                        <LuLockKeyhole size={30} color="black" className="mr-1 ml-4"/>
                        <input type="password"
                               placeholder="비밀번호"
                               className="w-full pt-3 pb-3 pl-1  border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"/>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="w-[150px] bg-teal-900 text-white font-black p-3 rounded-xl hover:bg-black">로그인
                        </button>
                    </div>
                </div>


                {/* 외부 로그인 버튼 */}
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

                <div className="flex justify-center mt-4">
                    <button className="w-[80px] bg-teal-900 text-xs text-white font-black p-1 rounded-lg hover:bg-black">회원가입</button>
                </div>
            </div>

                {/* 오른쪽 유저 폼 */}
            <div className="w-1/2 flex flex-col items-center justify-center text-center">
                <img src={logo} alt="HAIRISM Logo" className="w-[200px] h-auto mb-4"/>
                <h1 className="text-[6rem] font-bold leading-[0.8]">HAIRISM</h1>
                <h2 className="text-[2.75rem] text-black leading-[1.0] font-semibold">MY HAIR PARTNER</h2>
                <p className="text-[2.0rem] text-black font-semibold mt-4">회원 유형을 선택하세요</p>
            </div>
        </div>
    );
}

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import logo from "./images/logo.jpg";
// import google from "./images/google.png";
// import kakao from "./images/kakao.png";
// import loginImage from "./images/login.png";
// import { LuUser , LuLockKeyhole , LuArrowLeft} from "react-icons/lu";
//
// function App() {
//     const [isSignup, setIsSignup] = useState(false);
//     const [isVisible, setIsVisible] = useState(false);
//
//     const handleSignupClick = () => {
//         setIsSignup(true);
//         setIsVisible(true);
//     };
//
//     const handleBackClick = () => {
//         setIsSignup(false);
//         setIsVisible(false);
//     };
//
//     return (
//         <div className="flex min-h-screen relative overflow-hidden">
//             {/* 왼쪽 로그인 폼 */}
//             <div className={`w-1/2 flex flex-col items-center justify-center bg-white p-10 transition-all duration-500 ease-in-out ${isSignup ? 'opacity-0' : 'translate-x-0 opacity-100'}`}>
//                 <img src={logo} alt="HAIRISM Logo" className="w-[200px] h-auto mb-4"/>
//                 <h1 className="text-[6rem] font-bold leading-[0.8]">HAIRISM</h1>
//                 <h2 className="text-[2.75rem] text-black leading-[1.0] font-semibold">MY HAIR PARTNER</h2>
//
//                 {/* 역할 선택 버튼 */}
//                 <div className="flex space-x-2 mt-8">
//                     <button
//                         className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black shadow-md shadow-gray-700">사장이에요
//                     </button>
//                     <button
//                         className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black shadow-md shadow-gray-700">손님이에요
//                     </button>
//                     <button
//                         className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5  rounded-xl hover:bg-black shadow-md shadow-gray-700">디자이너에요
//                     </button>
//                 </div>
//
//                 {/* 로그인 폼 */}
//                 <div className="w-full max-w-sm mt-6">
//                     <div className="flex items-center mb-3 border rounded-lg">
//                         <LuUser size={30} color="black" className="mr-1 ml-4"/>
//                         <input type="text"
//                                placeholder="유저 이름"
//                                className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"/>
//                     </div>
//                     <div className="flex items-center mb-3 border rounded-lg ">
//                         <LuLockKeyhole size={30} color="black" className="mr-1 ml-4"/>
//                         <input type="password"
//                                placeholder="비밀번호"
//                                className="w-full pt-3 pb-3 pl-1  border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"/>
//                     </div>
//                     <div className="flex justify-center mt-4">
//                         <button
//                             className="w-[150px] bg-teal-900 text-white font-black p-3 rounded-xl hover:bg-black shadow-md shadow-gray-700">로그인
//                         </button>
//                     </div>
//                 </div>
//
//
//                 {/* 외부 로그인 버튼 */}
//                 <div className="w-full max-w-sm mt-4 space-y-2">
//                     <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-white">
//                         <img src={google} alt="google Logo" className="w-6 h-6 mr-2"/>
//                         <span className="text-black">Google 계정으로 로그인</span>
//                     </button>
//                     <button className="w-full flex items-center justify-center p-3 border rounded-lg bg-yellow-400">
//                         <img src={kakao} alt="kakao Logo" className="w-5 h-5 mr-2 "/>
//                         <span className="text-black">KaKao 계정으로 로그인</span>
//                     </button>
//                 </div>
//
//                 {/* 회원가입 버튼 클릭시 우측 이미지가 슬라이드되서 좌측으로 이동 */}
//                 <div className="flex justify-center mt-4">
//                     <button onClick={handleSignupClick}
//                             className="w-[80px] bg-teal-900 text-xs text-white font-black p-1 rounded-lg hover:bg-black shadow-md shadow-gray-700">회원가입
//                     </button>
//                 </div>
//             </div>
//
//
//             {/* 오른쪽 유저 폼 */}
//             <div className={`w-1/2 -mt-32 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//                 <img src={logo} alt="HAIRISM Logo" className="w-[200px] h-auto mb-4"/>
//                 <h1 className="text-[6rem] font-bold leading-[0.8]">HAIRISM</h1>
//                 <h2 className="text-[2.75rem] text-black leading-[1.0] font-semibold">MY HAIR PARTNER</h2>
//                 <p className="text-[2.0rem] text-black font-semibold mt-4">회원 유형을 선택하세요</p>
//                 <div className="mt-6 space-y-6 flex flex-col items-center">
//                     <button
//                         className="w-[160px] bg-[#005457] text-white py-3  rounded-lg text-lg font-semibold transition hover:bg-black shadow-md shadow-gray-700">
//                         사장이에요
//                     </button>
//                     <button
//                         className="w-[160px] bg-[#005457] text-white py-3  rounded-lg text-lg font-semibold transition hover:bg-black shadow-md shadow-gray-700">
//                         손님이에요
//                     </button>
//                     <button
//                         className="w-[160px] bg-[#005457] text-white py-3  rounded-lg text-lg font-semibold transition hover:bg-black shadow-md shadow-gray-700">
//                         디자이너에요
//                     </button>
//                 </div>
//                 {/*좌측상단 뒤로가기 버튼*/}
//                 {/* 뒤로가기 버튼 클릭시 좌측으로 슬라이드 된 이미지가 우측으로 다시 슬라이드됨*/}
//                 <button onClick={handleBackClick} className="absolute top-8 -ml-[700px] text-3xl">
//                     <LuArrowLeft size={40} color="black" className="mr-1 ml-4"/>
//                 </button>
//             </div>
//             {/* 우측 미용실 이미지 */}
//             <div
//                 className={`absolute right-0 top-0 h-full w-1/2 transition-transform duration-500 ${isSignup ? 'transform -translate-x-full ' : ''} overflow-hidden`}>
//                 <img src={loginImage} alt="Login" className={`object-cover w-full h-full ${isSignup ? 'rounded-tr-xl rounded-br-xl' : 'rounded-bl-xl rounded-tl-xl'}`} />
//             </div>
//         </div>
//     );
// }
//
// export default App;
import LeftLoginForm from "./components/LeftLoginForm.jsx"

function App() {
    return (
            <LeftLoginForm />
    );
}

export default App;

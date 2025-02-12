import { useState } from "react"
import Logo from "../Logo/Logo.jsx";
import SignUpRoleSelectionButton from "../button/SignUpButton/SignUpRoleSelectionButton.jsx";
import BackButton from "../button/SignUpButton/BackButton.jsx"
import GuestSignUpPage from "../GuestSignUpPage/GuestSignUpPage.jsx";

export default function RightLoginForm({ isVisible ,onBackClick }) {
    const [ selectedRole, setSelectedRole ] = useState(null);

    const handleGuestClick = () => {
        setSelectedRole("guest");
    };

    // const handleBossClick = () => {
    //     setSelectedRole("boss");
    // };
    //
    // const handleDesignerClick = () => {
    //     setSelectedRole("designer");
    // };



    return (
        <div className={`absolute w-1/2 right-0 top-[70px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out 
                         ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>


                <Logo/>

                <p className={"text-[2.0rem] text-black font-semibold mt-8"}>회원 유형을 선택하세요</p>


                <SignUpRoleSelectionButton
                    onGuestClick={handleGuestClick}
                    // onBossClick={handleBossClick()}
                    // onDesignerClick={handleDesignerClick()}
                />
            {/* 로그인 폼을 selectedRole이 null일 때만 표시 */}
            {selectedRole === null && (
                <div className="w-full h-full relative">
                    {/* 로그인 폼 내용 여기에 추가 */}
                </div>
            )}

            {/* selectedRole이 "guest"일 때 회원가입 창을 우측에 덮어씌우도록 */}
            {selectedRole === "guest" && (
                <div className="absolute top-0 left-0 w-full">
                    <GuestSignUpPage />
                </div>
            )}

                <BackButton onBackClick={onBackClick}/>

        </div>
    );
};
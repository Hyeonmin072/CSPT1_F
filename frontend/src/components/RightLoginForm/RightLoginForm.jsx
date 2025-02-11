import Logo from "../Logo/Logo.jsx";
import SignUpRoleSelectionButton from "../button/SignUpButton/SignUpRoleSelectionButton.jsx";
import BackButton from "../button/SignUpButton/BackButton.jsx"

export default function RightLoginForm({ isVisible ,onBackClick }) {
    return (
        <div className={`absolute w-1/2 right-0 top-[70px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out 
                         ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                <Logo/>

                <p className={"text-[2.0rem] text-black font-semibold mt-8"}>회원 유형을 선택하세요</p>

                <SignUpRoleSelectionButton/>

                <BackButton onBackClick={onBackClick}/>
        </div>
    );
};
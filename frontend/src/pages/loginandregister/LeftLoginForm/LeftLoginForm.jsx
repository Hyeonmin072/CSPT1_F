import UserTypeSelectionButtons from "../../../components/button/LoginPageButton/UserTypeSelectionButtons.jsx";
import Logo from "../../../components/loginandregisterlogo/Logo.jsx";

import LoginButton from "../../../components/button/LoginPageButton/LoginButton.jsx";
import SocialLoginButton from "../../../components/button/LoginPageButton/SocialLoginButton.jsx";
import { LockKeyhole, User } from "lucide-react";
import SignUpButton from "../../../components/button/LoginPageButton/SignUpButton.jsx";

export default function LeftLoginForm({ onSignupClick, isHidden }) {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <div
        className={`w-1/2 flex flex-col items-center justify-center bg-white p-10 transition-all duration-500 ease-in-out`}
      >
        <Logo />
        <UserTypeSelectionButtons />

        <div className="w-full max-w-sm mt-6">
          <div className="flex items-center mb-3 border rounded-lg">
            <User size={30} color="black" className="mr-1 ml-4" />
            <input
              type="text"
              placeholder="유저 이름"
              className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
            />
          </div>
          <div className="flex items-center mb-3 border rounded-lg ">
            <LockKeyhole size={30} color="black" className="mr-1 ml-4" />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full pt-3 pb-3 pl-1  border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
            />
          </div>
          <div className="flex justify-center mt-4">
            <LoginButton />
          </div>
          <div className="w-full max-w-sm mt-4 space-y-2">
            <SocialLoginButton />
          </div>

          <SignUpButton onSignupClick={onSignupClick} />
        </div>
      </div>
    </div>
  );
}

// 회원가입 버튼 , 이 버튼을 누르면 우측 미용실 이미지가 슬라이드되며 우측에 회원가입 창이 나옴
const SignUpButton = ({onSignupClick}) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={onSignupClick}
                    className="w-[80px] bg-teal-900 text-xs text-white font-black p-1 rounded-lg hover:bg-black shadow-md shadow-gray-700">회원가입
            </button>
        </div>
    );
};
export default SignUpButton;
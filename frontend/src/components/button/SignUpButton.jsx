const SignUpButton = ({onClick}) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={onClick}
                    className="w-[80px] bg-teal-900 text-xs text-white font-black p-1 rounded-lg hover:bg-black shadow-md shadow-gray-700">회원가입
            </button>
        </div>
    );
};
export default SignUpButton()
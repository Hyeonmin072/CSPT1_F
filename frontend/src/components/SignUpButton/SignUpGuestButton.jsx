// 회원가입 창에서 유저 선택 버튼 (손님버튼)
export default function SignUpGuestButton () {
    return (
        <button
            className="w-[160px] bg-[#005457] text-white py-3  rounded-lg text-lg font-semibold transition hover:bg-black shadow-md shadow-gray-700">
            손님이에요
        </button>
    );
}
// 회원가입 창에서 유저 선택 버튼 (디자이너버튼)
export default function BossButton ({onDesignerClick}) {
    return (
        <button
            onClick={ onDesignerClick }
            className="w-[160px] bg-[#005457] text-white py-3  rounded-lg text-lg font-semibold transition hover:bg-black shadow-md shadow-gray-700">
            디자이너에요
        </button>
    );
}
import {LuArrowLeft} from "react-icons/lu";

// 우측에 회원가입 시 유저 선택별 창에서 뒤로가기 버튼
const BackButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="absolute top-8 -ml-[700px] text-3xl">
            <LuArrowLeft size={40} color="black" className="mr-1 ml-4"/>
        </button>
    );
};
export default BackButton;
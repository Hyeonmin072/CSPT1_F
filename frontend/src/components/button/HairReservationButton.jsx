import { useNavigate } from "react-router-dom";

export default function HairReservationButton({onClick}){
    const navigate =  useNavigate();

    return (
        <button
            className="px-6 py-2 text-black font-semibold rounded-lg hover:bg-[#03DAC5] transition"
            onClick={() => navigate("/designerselect")}
        >
            예약하기
        </button>
    )
}
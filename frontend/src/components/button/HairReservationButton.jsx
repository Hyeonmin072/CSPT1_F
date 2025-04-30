import { useNavigate } from "react-router-dom";

export default function HairReservationButton({ shopEmail }) {
  const navigate = useNavigate();

  return (
    <button
      className="px-4 py-2 text-white font-semibold w-[100px]
        rounded-lg bg-[#03DAC5] hover:bg-[#00a896] transition duration-200"
      onClick={() => navigate(`/designerselect/${shopEmail}`)}
    >
      예약하기
    </button>
  );
}

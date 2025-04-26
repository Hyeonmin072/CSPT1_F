import { useNavigate } from "react-router-dom";

export default function HairReservationButton({ shopEmail }) {
  const navigate = useNavigate();

<<<<<<< HEAD
  return (
    <button
      className="px-4 py-2 text-black font-semibold
            rounded-lg hover:bg-green-500 transition duration-200"
      onClick={() => navigate(`/designerselect/${shopEmail}`)}
    >
      바로 예약하기
    </button>
  );
}
=======
    return (
        <button
            className="px-4 py-2 text-black font-semibold w-[100px]
            rounded-lg hover:bg-green-700 text-white transition duration-200"
            onClick={() => navigate("/designerselect")}
        >
            예약하기
        </button>
    )
}
>>>>>>> d01c27b2791eaa44514e92a0074a647f76b66c22

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckInfo() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);

  // 오늘의 예약 정보 가져오기
  const fetchTodayReservations = async () => {
    try {
      console.log("오늘의 예약 정보 요청 시작");
      // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옵니다
      const today = new Date().toISOString().split("T")[0];
      console.log("요청 날짜:", today);

      const response = await axiosInstance.get(
        `/shop/reservations/today?date=${today}`,
        {
          withCredentials: true,
        }
      );
      console.log("오늘의 예약 정보 응답:", response.data);

      if (response.data) {
        setReservations(response.data);
        // 예약 시간의 총 분 계산 (예시: 각 예약이 30분이라고 가정)
        const totalMinutes = response.data.length * 30;
        setTotalMinutes(totalMinutes);
      }
      setLoading(false);
    } catch (error) {
      console.error("오늘의 예약 정보 조회 실패:", error);
      console.error("오류 상세:", error.response);
      setError("예약 정보를 불러오는데 실패했습니다.");
      setLoading(false);

      toast.error("예약 정보를 불러오는데 실패했습니다.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // 컴포넌트 마운트 시 예약 정보 가져오기
  useEffect(() => {
    fetchTodayReservations();
  }, []);

  if (loading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="shadow-md flex flex-col justify-center border items-center p-4 rounded-lg">
        <p className="p-10">
          오늘의 남은 예약 손님은 총{" "}
          <span className="font-bold text-blue-600">{totalMinutes}분</span>{" "}
          있습니다.
        </p>
        <button
          className="text-white bg-black rounded-lg h-10 w-[200px]"
          onClick={() => navigate("/schedulecheck")}
        >
          예약 확인하기
        </button>
      </div>
      <div className="shadow-md flex flex-col justify-center items-center border p-4 rounded-lg">
        <p className="p-10">
          이번 달 동안{" "}
          <span className="font-bold text-green-600">2,354,000원</span>의 매출을
          달성하셨네요.
        </p>
        <button
          className="text-white bg-black rounded-lg h-10 w-[200px]"
          onClick={() => navigate("/sales")}
        >
          매출 확인하기
        </button>
      </div>
    </>
  );
}

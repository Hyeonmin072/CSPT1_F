import { useNavigate } from "react-router-dom";

export default function CheckInfo(){
    const naviate = useNavigate();

    return(
        <>
            <div className="shadow-md flex flex-col justify-center border items-center p-4 rounded-lg">
                <p className="p-10">
                    오늘의 남은 예약 손님은 총{' '}
                    <span className="font-bold text-blue-600">15분</span> 있습니다.
                </p>
                <button className="text-white bg-black rounded-lg h-10 w-[200px]"
                onClick={() => naviate("/schedulecheck")}>예약 확인하기</button>
            </div>
            <div className="shadow-md flex flex-col justify-center items-center border p-4 rounded-lg">
                <p className="p-10">
                    이번 달 동안{' '}
                    <span className="font-bold text-green-600">2,354,000원</span>의
                    매출을 달성하셨네요.
                </p>
                <button className="text-white bg-black rounded-lg h-10 w-[200px]"
                onClick={() => naviate("/sales")}>매출 확인하기</button>
            </div>
        </>
    );
}
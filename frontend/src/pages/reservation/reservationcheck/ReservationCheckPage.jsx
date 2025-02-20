import Header from "../../../components/common/Header.jsx";
import ReservationCheck from "../../../components/reservationcheck/ReservationCheck.jsx";

export default function ReservationCheckPage(){
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div className="p-4">
                <ReservationCheck/>
            </div>
        </div>
    );
}
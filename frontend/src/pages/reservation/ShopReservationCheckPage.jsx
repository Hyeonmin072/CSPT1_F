import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import ShopReservation from "../../components/businessabout/reservation/ShopReservation.jsx";
export default function ShopReservationCheckPage(){
    return(
        <div>
            <BusinessHeader />

            <div className="p-4">
                <ShopReservation />
            </div>
        </div>
    );
}
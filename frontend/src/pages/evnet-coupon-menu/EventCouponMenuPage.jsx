import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import EventCouponMenu from "../../components/businessabout/eventmenu/EventCouponMenu.jsx";

export default function EventCouponMenuPage(){
    return(
        <div>
            <BusinessHeader />

            <div className="p-4">
                <EventCouponMenu />
            </div>
        </div>
    );
}
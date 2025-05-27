import BusinessHeader from "../../components/common/BusinessHeader";
import ReviewManage from "../../components/businessabout/review/ReviewManage";

export default function ReviewManagePage(){
    return(
        <div>
            <BusinessHeader />

            <div>
                <ReviewManage/>
            </div>
        </div>
    );
}
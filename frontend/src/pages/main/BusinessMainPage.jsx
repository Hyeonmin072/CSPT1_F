import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import BusinessMain from "../../components/businessabout/main/BusinessMain.jsx";

export default function BusinessMainPage(){
    return(
        <div>
            <BusinessHeader />

            <div className="p-4">
                <BusinessMain />
            </div>
        </div>
    );
}
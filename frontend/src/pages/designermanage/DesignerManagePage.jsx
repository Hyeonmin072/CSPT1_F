import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import DesignerSetting from "../../components/businessabout/designermanage/DesignerSetting.jsx";

export default function DesignerManagePage(){
    return(
        <div>
            <BusinessHeader/>

            <div className="p-4">
                <DesignerSetting/>
            </div>
        </div>
    );
}
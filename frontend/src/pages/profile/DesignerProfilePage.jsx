import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfile from "../../components/DesingerAbout/profile/DesignerProfile.jsx";

export default function DesignerProfilePage(){
    return(
        <div>
            <DesignerHeader />

            <div className="p-4">
                <DesignerProfile />
            </div>
        </div>
    );
}
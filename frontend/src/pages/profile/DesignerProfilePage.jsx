import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfile from "../../components/DesingerAbout/profile/DesignerProfile.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function DesignerProfilePage(){

    return(
        <div>
            <DesignerHeader />

            <div className="p-4">
                <DesignerProfile />
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfileEdit from "../../components/DesingerAbout/profile/Edit/DesignerProfileEdit.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function DesignerProfileEditPage(){

    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <DesignerProfileEdit/>
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CVCheck from "../../components/DesingerAbout/cvcheck/CVCheck.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function CVCheckPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <CVCheck/>
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
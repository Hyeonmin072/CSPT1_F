import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CurriculumVitae from "../../components/DesingerAbout/cv/CurriculumVitae.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function CurriculumVitaePage(){

    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <CurriculumVitae/>
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
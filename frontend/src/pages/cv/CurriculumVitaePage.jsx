import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CurriculumVitae from "../../components/DesingerAbout/cv/CurriculumVitae.jsx";

export default function CurriculumVitaePage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <CurriculumVitae/>
            </div>
        </div>
    );
}
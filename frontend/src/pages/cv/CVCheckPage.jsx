import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CVCheck from "../../components/DesingerAbout/cvcheck/CVCheck.jsx";

export default function CVCheckPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <CVCheck/>
            </div>
        </div>
    );
}
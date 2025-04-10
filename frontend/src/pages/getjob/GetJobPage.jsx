import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import GetJob from "../../components/DesingerAbout/getjob/GetJob.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function GetJobPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <GetJob/>
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
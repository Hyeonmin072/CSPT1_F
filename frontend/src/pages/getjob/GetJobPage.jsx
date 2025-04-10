import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import GetJob from "../../components/DesingerAbout/getjob/GetJob.jsx";

export default function GetJobPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <GetJob/>
            </div>
        </div>
    );
}
import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import GetJobDetail from "../../components/DesingerAbout/getjob/detail/GetJobDetail.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function GetJobDetailPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <GetJobDetail/>
            </div>


        </div>
    );
}
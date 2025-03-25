import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import GetJobDetail from "../../components/DesingerAbout/getjob/detail/GetJobDetail.jsx";

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
import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import Clientcheck from "../../components/DesingerAbout/clientcheck/ClientCheck.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function ClientCheckPage(){
    return(
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <Clientcheck/>
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}
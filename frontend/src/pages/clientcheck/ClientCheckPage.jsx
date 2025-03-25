import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import Clientcheck from "../../components/DesingerAbout/clientcheck/ClientCheck.jsx";

export default function ClientCheckPage(){
    return(
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <Clientcheck/>
            </div>
        </div>
    );
}
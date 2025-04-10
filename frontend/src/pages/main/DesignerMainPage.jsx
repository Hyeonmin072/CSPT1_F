import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerMain from "../../components/DesingerAbout/main/DesignerMain.jsx";

export default function DesignerMainPage(){
    return(
        <div>
            <DesignerHeader />

            <div className="p-4">
                <DesignerMain />
            </div>
        </div>
    );
}
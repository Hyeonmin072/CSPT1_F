import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfileEdit from "../../components/DesingerAbout/profile/Edit/DesignerProfileEdit.jsx";

export default function DesignerProfileEditPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <DesignerProfileEdit/>
            </div>
        </div>
    );
}
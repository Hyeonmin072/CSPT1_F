import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerMain from "../../components/DesingerAbout/main/DesignerMain.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function DesignerMainPage() {
    return (
        <div>
            <DesignerHeader />

            <div className="p-4">
                <DesignerMain />
            </div>

            <DesignerID designer={selectedDesigner} />
        </div>
    );
}

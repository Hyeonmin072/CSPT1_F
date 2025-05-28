import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import Sales from "../../components/DesingerAbout/sales/Sales.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";

export default function SalesPage(){
    return (
        <div>
            <DesignerHeader/>

            <div className="p-4">
                <Sales/>
            </div>
        </div>
    );
}
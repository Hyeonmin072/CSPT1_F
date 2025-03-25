import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import Sales from "../../components/businessabout/sales/Sales.jsx";

export default function BusinessSalesPage(){
    return (
        <div>
            <BusinessHeader/>

            <div className="p-4">
                <Sales/>
            </div>
        </div>
    );
}
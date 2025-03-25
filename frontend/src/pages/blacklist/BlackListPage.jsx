import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import BlackList from "../blacklist/BlackList.jsx";

export default function BlackListPage(){
    return(
        <div>
            <BusinessHeader/>

            <div className="p-4">
                <BlackList/>
            </div>
        </div>
    );
}
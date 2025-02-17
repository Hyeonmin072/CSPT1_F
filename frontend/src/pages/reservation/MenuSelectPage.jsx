import MenuSelect from "../../components/reservation/menuselect/MenuSelect.jsx"
import Header from "../../components/common/Header.jsx";
export default function MenuSelectPage(){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="p-4">
                <MenuSelect/>
            </div>
        </div>
    );
}
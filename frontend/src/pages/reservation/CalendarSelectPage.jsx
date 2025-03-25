import CalendarSelect from "../../components/reservation/calendarselect/CalendarSelect.jsx"
import Header from "../../components/common/Header.jsx";
export default function CalendarSelectPage(){
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="p-4">
            <CalendarSelect/>
                </div>
        </div>
    );
};
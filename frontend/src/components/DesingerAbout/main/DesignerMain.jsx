import Notice from "./Notice.jsx";
import ProfileQuick from "./ProfileQuick.jsx";
import ChartQuick from "./ChartQuick.jsx";
import ScheduleQuick from "./ScheduleQuick.jsx";

export default function DesignerMain() {
    return (
        <div className="mx-auto max-w-7xl flex flex-row">
            <div className="flex items-center justify-center w-[1000px] pt-10 mt-5">
                <Notice/>
            </div>

            <div className="pt-10 flex flex-col items-center justify-center w-[300px] mt-5">
                <div className="border p-5 mb-5 rounded-lg shadow-md">
                    <ProfileQuick />
                </div>
                <div className="border p-5 mb-5 rounded-lg shadow-md">
                    <ChartQuick/>
                </div>
                <div className="border p-5 rounded-lg shadow-md w-full">
                    <ScheduleQuick/>
                </div>
            </div>
        </div>
    );
}

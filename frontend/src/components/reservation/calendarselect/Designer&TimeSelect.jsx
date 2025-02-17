import { useState } from "react";
import designerEX from "../../../assets/hairshop/designerEX.jpg";

export default function DesignerTimeSelect({ selectedTime, handleTimeClick, unavailableTimes }) {
    const times = [
        '10:00', '10:30', '11:00', '11:30', '12:00',
        '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00',
    ];

    const selectedDesigner = {
        name: '디자이너 해나', experience: '7년', description: '앞머리 컬러링 및 건강하게 센스있게', imageUrl: designerEX,
    };

    const handleButtonClick = (time) => {
        console.log("Time clicked:", time);
        handleTimeClick(time);
    };

    return (
        <>
            <div className="w-1/4 flex flex-col items-center">
                <img src={selectedDesigner.imageUrl} alt="디자이너" className="w-40 h-40 rounded-full mt-4" />
                <p className="m-2">{selectedDesigner.name} ({selectedDesigner.experience})</p>
                <p className="text-sm text-gray-600">{selectedDesigner.description}</p>
            </div>
            <div className="w-3/4 grid grid-cols-7 gap-4 p-5">
                {times.map((time) => (
                    <button
                        key={time}
                        onClick={() => handleButtonClick(time)}
                        className={`py-2 border rounded-lg ${unavailableTimes.includes(time) ? 'bg-gray-400 text-gray-700' : time === selectedTime ? 'bg-black text-white font-bold' : 'bg-gray-200'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </>
    );
}

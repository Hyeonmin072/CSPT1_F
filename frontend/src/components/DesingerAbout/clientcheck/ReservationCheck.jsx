import { motion } from "framer-motion";
import { CalendarDays, List } from 'lucide-react';

export default function ReservationCheck({ Designerprofile, selectedView, setSelectedView }){
    return (
        <div className="flex space-x-3">
            {/* 내 예약 보기 / 모든 예약 보기 */}
            <div className="border bg-white rounded-lg flex flex-row items-center relative">
                <motion.div
                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-gray-300 rounded-lg"
                    animate={{x: selectedView === "my" ? "0%" : "100%"}}
                    transition={{type: "spring", stiffness: 100, damping: 20}}
                />
                <button
                    className={`z-10 p-2 flex flex-row text-gray-700`}
                    onClick={() => setSelectedView("my")}
                >
                    <CalendarDays className="mx-1"/>
                    <p>내 예약 보기</p>
                </button>
                <button
                    className={`z-10 p-2 flex flex-row text-gray-700`}
                    onClick={() => setSelectedView("all")}
                >
                    <List className="mx-1"/>
                    <p>모든 예약 보기</p>
                </button>
            </div>

            <div className="flex flex-row w-[170px] ml-auto">
                <div className="rounded-full bg-gray-300 w-12 h-12">
                    {Designerprofile && Designerprofile.length > 0 && Designerprofile[0].imageURL ? (
                        <img
                            src={Designerprofile[0].imageURL}
                            className="w-12 h-12 rounded-full mb-4"
                        />
                    ) : (
                        <div
                            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                            {/* 기본 이미지 */}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center p-2">
                    디자이너 이름
                </div>
            </div>

        </div>
    );
}
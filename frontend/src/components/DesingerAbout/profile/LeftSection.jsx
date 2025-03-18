import { MessageSquareText } from "lucide-react";

export default function LeftSection({ designer }){
    return(
        <>
            {designer && (
                <div>
                    <div className="bg-gray-100 p-5 rounded">
                        <p className="mt-2">{designer.introduce}</p>
                    </div>
                    <div className="mt-4 px-5 flex flex-row space-x-5">
                        <button className="w-[120px] border border-[#00B3A6] text-[#00B3A6] py-2 rounded">
                            예약하기
                        </button>
                        <button className=" bg-[#00B3A6] rounded-full flex items-center justify-center">
                            <MessageSquareText className="w-10 h-5 text-white"/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
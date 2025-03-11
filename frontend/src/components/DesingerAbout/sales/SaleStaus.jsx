import React from "react";

export default function SaleStaus({ Designerprofile }){
    return(
        <>
            <div
                className="w-3/4 mr-10 ml-10 flex flex-row mb-8 items-center justify-center space-x-4 bg-white shadow-md rounded">
                <div className="p-4 w-1/2 text-center">
                    <h2 className="text-lg font-semibold mb-4">이번 달 매출</h2>
                    <p className="text-3xl font-bold text-green-500">₩430,000</p>
                    <p className="text-sm text-gray-500 mt-2">증가: 10.0%</p>
                </div>
                <div className="p-4 w-1/2 text-center">
                    <h2 className="text-lg font-semibold mb-4">오늘 매출</h2>
                    <p className="text-3xl font-bold text-red-500">₩129,000</p>
                    <p className="text-sm text-gray-500 mt-2">감소: 3.0%</p>
                    <p className="text-sm text-gray-500">주문 수: 5</p>
                </div>
            </div>

            <div className="w-[310px] mr-10 ml-10 mb-8 bg-white rounded-lg shadow-md ">
                <div className="flex flex-col">
                    <div className="flex flex-row p-3 ml-3">
                        {Designerprofile && Designerprofile.length > 0 && Designerprofile[0].imageURL ? (
                            <img
                                src={Designerprofile[0].imageURL}
                                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-4"
                            />
                        ) : (
                            <div
                                className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center mb-4">
                                    <span className="text-white">
                                        {Designerprofile && Designerprofile[0] ? Designerprofile[0].name : ''}
                                    </span>
                            </div>
                        )}
                        <div className="ml-4 py-5 p-3">
                            <p className="font-bold text-gray-500 text-m">이름: 봉준호</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        {/* 이후 수정 */}
                        <p className="font-semibold text-gray-500 text-xl">디자이너의 소속</p>
                    </div>
                </div>
            </div>
        </>
    );
}
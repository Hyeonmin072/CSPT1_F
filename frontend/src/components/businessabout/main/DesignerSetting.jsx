import designerEX from "../../../assets/hairshop/designerEX.jpg";

export default function DesignerSetting() {
    // 디자이너 데이터 리스트
    const designers = [
        {
            name: "김예원 디자이너",
            price: 751000,
            like: 25,
            image: designerEX,
        },
        {
            name: "김봉팔 디자이너",
            price: 640000,
            like: 32,
            image: designerEX,
        },
        {
            name: "최수정 디자이너",
            price: 550000,
            like: 20,
            image: designerEX,
        },
    ];

    // 매출 및 좋아요 우수 디자이너 계산
    const topPriceDesigner = designers.reduce((prev, curr) =>
        prev.price > curr.price ? prev : curr
    );
    const topLikeDesigner = designers.reduce((prev, curr) =>
        prev.like > curr.like ? prev : curr
    );

    return (
        <>
            <div className="space-y-4">
                {/* 매출 우수 디자이너 */}
                <div className="flex flex-col items-center rounded-lg border shadow bg-white h-[163px]">
                    <div className="p-3 flex items-center border-b-2 w-full justify-center">
                        <h2 className="font-bold text-lg">이번 달의 매출 우수 디자이너</h2>
                    </div>
                    <div className="p-4 flex flex-row items-center w-full">
                        {/* 왼쪽 텍스트 */}
                        <div className="flex-1 items-center justify-center">
                            <p className="font-bold text-gray-700">{topPriceDesigner.name}</p>
                            <p className="text-gray-500">
                                {topPriceDesigner.price.toLocaleString()}원
                            </p>
                            <p className="text-sm text-gray-400">이번 달 매출 1위</p>
                        </div>
                        {/* 오른쪽 이미지 */}
                        <img
                            src={topPriceDesigner.image}
                            alt={`${topPriceDesigner.name} 프로필`}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    </div>
                </div>

                {/* 좋아요 우수 디자이너 */}
                <div className="flex flex-col items-center rounded-lg border shadow bg-white h-[163px]">
                    <div className="p-3 flex items-center border-b-2 w-full justify-center">
                        <h2 className="font-bold text-lg">이번 달의 좋아요 우수 디자이너</h2>
                    </div>
                    <div className="p-4 flex flex-row items-center w-full">
                        {/* 왼쪽 텍스트 */}
                        <div className="flex-1 items-center justify-center">
                            <p className="font-bold text-gray-700">{topLikeDesigner.name}</p>
                            <p className="text-gray-500">{topLikeDesigner.like} 증가</p>
                            <p className="text-sm text-gray-400">가장 많은 좋아요 증가</p>
                        </div>
                        {/* 오른쪽 이미지 */}
                        <img
                            src={topLikeDesigner.image}
                            alt={`${topLikeDesigner.name} 프로필`}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

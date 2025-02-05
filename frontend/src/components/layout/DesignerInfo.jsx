import designerEX from "../../assets/hairshop/designerEX.jpg";

export default function DesignerInfo(){
    return (
        <div className=" w-1/5">
            <div className="bg-gray-900 text-white p-4 rounded-lg">
                <img
                    src={designerEX}
                    alt="디자이너"
                    className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold mt-2">DESMOND JOEL</h3>
                <p className="text-gray-400">⭐ 4.8 평점</p>
                <p className="text-gray-400">컷트, 염색, 스타일링 전문</p>
            </div>
        </div>
    )
}
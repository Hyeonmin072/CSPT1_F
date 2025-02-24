export default function ProfileQuick({ Designerprofile,handleProfile }){
    return (
        <div className="flex items-center w-[260px]" onClick={handleProfile}>
            {/* 이미지가 없으면 회색 배경의 둥근 div 출력 */}
            {Designerprofile[0].imageURL ? (
                <img
                    src={Designerprofile[0].imageURL}
                    className="w-12 h-12 rounded-full mb-4"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <span className="text-white">{Designerprofile[0].name}</span>
                </div>
            )}
            <div className="ml-4 py-1">
                <p className="font-bold text-gray-400 text-sm">이름: {Designerprofile[0].name}</p>
                <p className="text-xl text-gray-700 font-bold">{Designerprofile[0].roll}</p>
                <p className="text-sm text-gray-500">전화번호: {Designerprofile[0].phone}</p>
            </div>
        </div>
    );
}
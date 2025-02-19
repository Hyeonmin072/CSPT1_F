export default function ReviewTabs({ selectedTab, handleClick }) {
    const tabs = ['전체', '추천메뉴', '커트', '펌', '염색', '클리닉', '스타일링'];
    const hairshop = ['포레포레헤어 고속터미널점'];

    return (
        <div className="container mx-auto px-20 py-5 w-[970px]">
            <div className="text-4xl font-bold">{hairshop}</div>
            <div className="flex gap-6 mt-5">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`p-5 py-2 rounded-lg ${selectedTab === tab ? 'bg-[#70EFDE] text-white' : 'bg-white text-gray-600'}`}
                        onClick={() => handleClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function MenuTabs({ selectedTab, handleClick }){
    const tabs = ['추천메뉴', '커트', '펌', '염색', '클리닉', '스타일링'];

    return (
        <div className="flex px-10 pb-4 w-full gap-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`p-4 py-2 rounded-lg ${selectedTab === tab ? 'bg-[#70EFDE] text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => handleClick(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
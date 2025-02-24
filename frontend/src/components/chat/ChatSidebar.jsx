import { useState } from "react";
import { Search } from "lucide-react";

const ChatSidebar = ({ setSelectedChat, selectedChat }) => {
    const chats = [
        {
            id: 1,
            name: "디자이너A",
            lastMessage: "너무 잘 어울려요!!",
            time: "18:00",
            messages: [
                { text: "안녕하세요 고객님!", sender: "designer", time: "2024-12-25 10:00" },
                { text: "머리를 어떻게 하실 예정인가요?", sender: "designer", time: "2024-12-25 10:05" },
            ],
        },
        {
            id: 2,
            name: "디자이너B",
            lastMessage: "저희 샵에 방문해서 한번 보고 제가 추천드려도 될까요?",
            time: "18:18",
            messages: [
                { text: "어떤 스타일을 원하시나요?", sender: "designer", time: "2024-12-26 12:00" },
                { text: "파마를 해볼까 고민 중이에요!", sender: "user", time: "2024-12-26 12:05" },
            ],
        },
        {
            id: 3,
            name: "디자이너C",
            lastMessage: "파마가 잘 어울리실거 같아요!!",
            time: "18:03",
            messages: [
                { text: "어떤 스타일이 요즘 유행인가요?", sender: "user", time: "2024-12-26 14:00" },
                { text: "요즘 자연스러운 컬이 인기예요!", sender: "designer", time: "2024-12-26 14:05" },
            ],
        },
        {
            id: 4,
            name: "디자이너D",
            lastMessage: "계란형 얼굴에는 어떤 헤어가 어울려요!!",
            time: "18:03",
            messages: [
                { text: "제 얼굴형에 어울리는 스타일은?", sender: "user", time: "2024-12-26 15:00" },
                { text: "얼굴형에 맞는 헤어 추천해드릴게요!", sender: "designer", time: "2024-12-26 15:05" },
            ],
        },
    ];

    return (
        <div className="w-1/4 h-full bg-white border-r">
            {/* 검색창 */}
            <div className="p-4 border-b">
                <div className="flex items-center border rounded-xl">
                    <Search size={20} className="text-gray-500 ml-2" />
                    <input
                        type="text"
                        placeholder="검색"
                        className="w-full p-2 focus:outline-none border-none rounded-xl"
                    />
                </div>
            </div>

            {/* 채팅 목록 */}
            <div className="overflow-y-auto">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer 
                            ${selectedChat?.id === chat.id ? "bg-gray-200" : ""}`}
                        onClick={() => setSelectedChat(chat)}
                    >
                        <img
                            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQvimZpavcvaEDMI_W17ihfpy5F_qqxeVTZwsvn1szPyK-coABp6AbdJQrrzrha_8clfAJywtVuD0AFua8gULl3unIzxi-KxVg4LKywiPc"
                            alt={chat.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 ml-2">
                            <p className="font-semibold">{chat.name}</p>
                            <p className="text-sm text-gray-500 truncate w-40">{chat.lastMessage}</p>
                        </div>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;

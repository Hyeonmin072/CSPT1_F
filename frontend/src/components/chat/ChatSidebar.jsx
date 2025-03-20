import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

const ChatSidebar = ({ setSelectedChat, selectedChat, chats }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 검색어 상태 추가

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get("https://your-backend-api.com/chats");
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, []);

    // 🔍 검색어와 일치하는 채팅 목록 필터링
    const filteredChats = chats.filter((chat) =>
        chat.designerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 로딩 중일 때
    if (loading) {
        return <div>Loading...</div>;
    }

    // 검색 결과가 없을 때와 채팅 목록이 없을 때 처리
    const noChatsMessage = searchTerm
        ? "검색 결과가 없습니다"
        : "채팅 목록이 없습니다";

    return (
        <div className="w-1/4 h-full bg-white border-r">
            <div className="p-4 border-b">
                <div className="flex items-center border rounded-xl">
                    <Search size={20} className="text-gray-500 ml-2" />
                    <input
                        type="text"
                        placeholder="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
                        className="w-full p-2 focus:outline-none border-none rounded-xl"
                    />
                </div>
            </div>

            <div className="overflow-y-auto">
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer 
                                ${selectedChat?.id === chat.id ? "bg-gray-200" : ""}`}
                            onClick={() => setSelectedChat(chat)}
                        >
                            <img
                                src={chat.avatarUrl}
                                alt={chat.designerName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 ml-2">
                                <p className="font-semibold">{chat.designerName}</p>
                                <p className="text-sm text-gray-500 truncate w-40">{chat.lastMessage}</p>
                            </div>
                            <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500 text-center">{noChatsMessage}</div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";  // axios를 사용하여 API 호출

const ChatSidebar = ({ setSelectedChat, selectedChat }) => {
    const [chats, setChats] = useState([]);  // 상태로 채팅 목록 관리
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // 컴포넌트가 처음 렌더링될 때 API 호출
    useEffect(() => {
        // 백엔드에서 채팅 데이터를 가져오는 예시
        const fetchChats = async () => {
            try {
                const response = await axios.get("https://your-backend-api.com/chats"); // 실제 API URL로 교체
                setChats(response.data); // 받아온 데이터를 상태에 저장
                setLoading(false); // 로딩 종료
            } catch (error) {
                console.error("Error fetching chats:", error);
                setLoading(false); // 에러가 나더라도 로딩 종료
            }
        };

        fetchChats();  // API 호출
    }, []);

    // 로딩 중일 때 처리
    if (loading) {
        return <div>Loading...</div>;
    }

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
                            src={chat.avatarUrl}  // 백엔드에서 제공하는 아바타 URL
                            alt={chat.designerName}  // 디자이너 이름
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 ml-2">
                            <p className="font-semibold">{chat.designerName}</p>
                            <p className="text-sm text-gray-500 truncate w-40">{chat.lastMessage}</p>
                        </div>
                        <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;

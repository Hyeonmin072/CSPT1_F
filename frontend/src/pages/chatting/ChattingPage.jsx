import { useState } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";

const ChattingPage = () => {
    const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅 상태 추가

    return (
        <div className="flex w-full h-auto bg-white justify-center items-center">
            <div className={"flex w-full max-w-[1300px] h-[90vh] bg-white rounded-lg overflow-hidden"}>
                {/* 채팅 목록 */}
                <ChatSidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} />

                {/* 채팅창 (선택된 채팅이 있을 때만 표시) */}
                {selectedChat ? <ChatWindow selectedChat={selectedChat} /> : <div className="flex-1 flex justify-center items-center text-gray-500">채팅을 선택하세요</div>}
            </div>
        </div>
    );
};

export default ChattingPage;

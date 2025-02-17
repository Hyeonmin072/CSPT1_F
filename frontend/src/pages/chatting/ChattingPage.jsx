import React from "react";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "./ChatWindow";

const ChattingPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 채팅 목록 */}
            <ChatSidebar />

            {/* 채팅창 */}
            <ChatWindow />
        </div>
    );
};

export default ChattingPage;

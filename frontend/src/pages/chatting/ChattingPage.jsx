import { useState, useEffect } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";

const socket = new WebSocket("ws://localhost:5000")

const ChattingPage = () => {
    const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅 상태 추가
    const [message, setMessage] = useState([]); // 채팅 메시지 상태 추가

    useEffect(() => {
        socket.onopen = () => console.log("Websocket 연결됨");

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data); // 받은 메시지를 JSON으로 파싱
            setMessage((prev) => [...prev, newMessage]); // 메시지 추가
        };

        socket.onclose = () => console.log("Websocket 연결 종료");

        return () => {
            socket.close(); //컴포넌트 언마운트시 Websocket 닫기
        };
    }, []);

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

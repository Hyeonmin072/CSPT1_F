import { useState, useEffect } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";

const ChattingPage = () => {
    const [selectedChat, setSelectedChat] = useState(null); // 선택된 채팅 상태 추가
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태 추가
    const [socket, setSocket] = useState(null); // WebSocket 상태 관리

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5001");

        newSocket.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data); // 받은 메시지를 JSON으로 파싱
            setMessages((prev) => [...prev, newMessage]); // 메시지 추가
        };

        newSocket.onerror = (error) => {
            console.log("WebSocket 오류: ", error);
        };


        newSocket.onclose = () => {
            console.log("WebSocket 연결 종료");
        };

        setSocket(newSocket); // 소켓 상태 설정

        return () => {
            newSocket.close(); // 컴포넌트 언마운트시 WebSocket 닫기
        };
    }, []); // 빈 의존성 배열로 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <div className="flex w-full h-auto bg-white justify-center items-center">
            <div className="flex w-full max-w-[1300px] h-[90vh] bg-white rounded-lg overflow-hidden">
                {/* 채팅 목록 */}
                <ChatSidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} />

                {/* 채팅창 (선택된 채팅이 있을 때만 표시) */}
                {selectedChat ? (
                    <ChatWindow selectedChat={selectedChat} messages={messages} />
                ) : (
                    <div className="flex-1 flex justify-center items-center text-gray-500">
                        채팅을 선택하세요
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChattingPage;

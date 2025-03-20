import { useState, useEffect } from "react";
import axios from "axios";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";

const ChattingPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]); // 채팅 목록 상태 추가

    // 채팅을 선택하면 그 채팅 불러오기
    useEffect(() => {
        if (selectedChat) {
            axios.get(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
                .then(response => {
                    setSelectedChat((prevChat) => ({
                        ...prevChat,
                        messages: response.data,
                    }));
                })
                .catch(error => {
                    console.error("채팅 메시지를 불러오는 중 오류 발생 :", error);
                });
        }
    }, [selectedChat]);

    // WebSocket 연결 설정
    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5000");

        newSocket.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            // 새로운 메시지를 받아서 채팅 목록에 있는 해당 채팅의 마지막 메시지 업데이트
            setChats((prevChats) => {
                return prevChats.map((chat) =>
                    chat.id === newMessage.chatId
                        ? { ...chat, lastMessage: newMessage.text, lastMessageTime: newMessage.timestamp }
                        : chat
                );
            });
        };

        newSocket.onerror = (error) => {
            console.log("WebSocket 오류: ", error);
        };

        newSocket.onclose = () => {
            console.log("WebSocket 연결 종료");
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <div className="flex w-full h-auto bg-white justify-center items-center">
            <div className="flex w-full max-w-[1300px] h-[90vh] bg-white rounded-lg overflow-hidden">
                <ChatSidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} chats={chats} />
                {selectedChat ? (
                    <ChatWindow selectedChat={selectedChat} socket={socket} />
                ) : (
                    <div className="flex-1 flex justify-center items-center text-gray-500">
                        채팅을 시작하세요
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChattingPage;

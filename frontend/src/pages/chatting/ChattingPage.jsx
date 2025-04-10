import { useState, useEffect } from "react";
import axios from "axios";
import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "../../components/chat/ChatWindow.jsx";

const ChattingPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (selectedChat) {
            axios.get(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
                .then(response => {
                    setSelectedChat(prevChat => ({
                        ...prevChat,
                        messages: response.data,
                    }));
                })
                .catch(error => console.error("채팅 메시지를 불러오는 중 오류 발생:", error));
        }
    }, [selectedChat]);

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5000");

        newSocket.onopen = () => console.log("WebSocket 연결됨");

        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);

            setChats(prevChats => prevChats.map(chat =>
                chat.id === newMessage.chatId
                    ? { ...chat, lastMessage: newMessage.text, lastMessageTime: newMessage.timestamp }
                    : chat
            ));

            setSelectedChat(prevChat => {
                if (!prevChat || prevChat.id !== newMessage.chatId) return prevChat;
                return {
                    ...prevChat,
                    messages: [...prevChat.messages, newMessage],
                };
            });
        };

        newSocket.onerror = error => console.error("WebSocket 오류:", error);
        newSocket.onclose = () => console.log("WebSocket 연결 종료");

        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    return (
        <div className="flex w-full h-auto bg-white justify-center items-center">
            <div className="flex w-full max-w-[1300px] h-[90vh] bg-white rounded-lg overflow-hidden">
                <ChatSidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} chats={chats} setChats={setChats} />
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

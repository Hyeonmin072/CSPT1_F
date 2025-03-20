import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format, isSameDay, parseISO } from "date-fns";
import { Search, MoreVertical } from "lucide-react";

const ChatWindow = ({ selectedChat, socket }) => {
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (selectedChat?.id) {
            // WebSocket으로 받은 메시지 업데이트
            const handleMessage = (event) => {
                const newMessage = JSON.parse(event.data);
                if (newMessage.chatId === selectedChat.id) {
                    selectedChat.messages.push(newMessage); // 메시지 배열에 추가
                }
            };

            socket?.addEventListener("message", handleMessage);

            return () => socket?.removeEventListener("message", handleMessage);
        }
    }, [selectedChat, socket]);

    const sendMessage = () => {
        if (!input.trim() || !selectedChat?.id) return;

        const newMessage = {
            text: input,
            sender: "user",
            time: format(new Date(), "yyyy-MM-dd HH:mm"),
            chatId: selectedChat.id,
        };

        socket?.send(JSON.stringify(newMessage));

        axios.post(`http://localhost:5000/api/chats/${selectedChat.id}/messages`, newMessage)
            .then(() => {
                selectedChat.messages.push(newMessage); // 메시지 배열에 추가
            })
            .catch(error => console.error("메시지 전송 실패:", error));

        setInput("");
    };

    const deleteChat = () => {
        if (!window.confirm("정말로 대화를 삭제하시겠습니까?")) return;

        axios.delete(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
            .then(() => {
                selectedChat.messages = []; // 대화 삭제
            })
            .catch(error => console.error("대화 삭제 실패:", error));
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChat?.messages]);

    return (
        <div className="flex flex-col w-3/4 h-full bg-white">
            <div className="mt-[18px] p-4 bg-white shadow-md flex justify-between items-center">
                <span className="text-lg font-bold">{selectedChat?.name}</span>
                <div className="flex items-center space-x-3">
                    <button onClick={() => setSearchOpen(!searchOpen)}>
                        <Search className="w-6 h-6 text-gray-700" />
                    </button>
                    {searchOpen && (
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="검색..."
                            className="border border-gray-300 px-2 py-1 rounded-md text-sm transition-all duration-300"
                        />
                    )}
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <MoreVertical className="w-6 h-6 text-gray-700" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 text-sm z-10">
                                <button onClick={deleteChat} className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                                    대화 삭제
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="chat-window flex-1 p-4 space-y-4 bg-blue-100 max-h-[70vh] overflow-y-auto">
                {selectedChat?.messages?.filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase())).map((msg, index) => {
                    const currentMessageDate = msg.time ? parseISO(msg.time) : new Date();
                    const previousMessageDate = index > 0 ? parseISO(selectedChat.messages[index - 1].time) : null;
                    const showDate = !previousMessageDate || !isSameDay(currentMessageDate, previousMessageDate);

                    return (
                        <div key={index}>
                            {showDate && (
                                <div className="text-center my-2 text-gray-500 text-sm">
                                    {format(currentMessageDate, "yyyy년 MM월 dd일")}
                                </div>
                            )}
                            <div className={`relative max-w-[50%] w-fit p-2 rounded-md 
                                ${msg.sender === "user" ? "bg-green-400 text-white ml-auto" : "bg-white"}`}>
                                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                                <span className="block text-right text-xs text-gray-400 w-full">
                                    {format(currentMessageDate, "HH:mm")}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Message"
                    className="flex-1 border border-gray-300 p-2 rounded-md"
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;

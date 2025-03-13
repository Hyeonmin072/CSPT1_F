import { useState, useRef, useEffect } from "react";
import axios from "axios"; // ✅ axios 추가
import { format, isSameDay, parse } from "date-fns";
import { Search, MoreVertical } from "lucide-react";

const ChatWindow = ({ selectedChat, socket }) => {
    const [messages, setMessages] = useState([]); // ✅ 초기값을 빈 배열로 변경
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // ✅ 채팅 메시지를 서버에서 가져오기
    useEffect(() => {
        if (!selectedChat) return;

        axios.get(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
            .then(response => {
                setMessages(response.data); // 서버에서 받은 메시지 상태 업데이트
            })
            .catch(error => {
                console.error("채팅 메시지를 불러오는 중 오류 발생:", error);
            });

    }, [selectedChat]); // ✅ 선택한 채팅이 변경될 때마다 실행

    // ✅ WebSocket을 통한 실시간 메시지 수신
    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage.chatId === selectedChat.id) {
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        return () => {
            socket.onmessage = null;
        };
    }, [socket, selectedChat]);

    // ✅ 메시지 전송 함수 (서버에도 전송)
    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            text: input,
            sender: "user",
            time: format(new Date(), "yyyy-MM-dd HH:mm"),
            chatId: selectedChat.id, // ✅ chatId 추가
        };

        console.log("새 메시지 추가:", newMessage); //내가 전송한 메시지 확인 콘솔

        // ✅ WebSocket을 통해 서버에 메시지 전송
        // socket.send(JSON.stringify(newMessage));

        // ✅ 서버에 메시지 저장 요청 (axios POST 요청)
        // axios.post(`http://localhost:5000/api/chats/${selectedChat.id}/messages`, newMessage)
        //     .then(() => {
        //         setMessages((prev) => [...prev, newMessage]); // 상태 업데이트
        //     })
        //     .catch(error => {
        //         console.error("메시지 전송 실패:", error);
        //     });

        setInput("");
    };

    // ✅ 대화 삭제 기능 (서버에서도 삭제 요청)
    const deleteChat = () => {
        if (window.confirm("정말로 대화를 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
                .then(() => {
                    setMessages([]); // 상태에서 메시지 삭제
                    setMenuOpen(false);
                })
                .catch(error => {
                    console.error("대화 삭제 실패:", error);
                });
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-3/4 h-full bg-white">
            {/* 채팅 헤더 */}
            <div className="mt-[18px] p-4 bg-white shadow-md flex justify-between items-center">
                <span className="text-lg font-bold">{selectedChat.name}</span>

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

                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <MoreVertical className="w-6 h-6 text-gray-700" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 text-sm z-10">
                                <button onClick={deleteChat} className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                                    대화 삭제
                                </button>
                                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                                    디자이너 프로필 보기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 채팅 메시지 */}
            <div className="chat-window flex-1 p-4 space-y-4 bg-blue-100 max-h-[70vh] overflow-y-auto">
                {messages
                    .filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((msg, index) => {
                        const currentMessageDate = parse(msg.time, "yyyy-MM-dd HH:mm", new Date());
                        const previousMessageDate = index > 0
                            ? parse(messages[index - 1].time, "yyyy-MM-dd HH:mm", new Date())
                            : null;

                        const showDate = !previousMessageDate || !isSameDay(currentMessageDate, previousMessageDate);

                        return (
                            <div key={index}>
                                {showDate && (
                                    <div className="text-center my-2 text-gray-500 text-sm">
                                        {format(currentMessageDate, "yyyy년 MM월 dd일")}
                                    </div>
                                )}
                                <div className={`relative max-w-[50%] w-fit p-2 rounded-md 
                                    ${msg.sender === "user" ? "bg-green-400 text-white ml-auto self-end" : "bg-white self-start"}`}>
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

            {/* 메시지 입력창 */}
            <div className="p-4 bg-white flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Message"
                    className="flex-1 border border-gray-300 p-2 rounded-md resize-none overflow-hidden"
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;

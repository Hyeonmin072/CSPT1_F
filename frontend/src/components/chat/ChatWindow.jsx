import { useState, useRef, useEffect } from "react";
import { format, isSameDay, parse } from "date-fns";
import { Search, MoreVertical } from "lucide-react";

const ChatWindow = ({ selectedChat }) => {
    const [messages, setMessages] = useState(selectedChat.messages); // 선택된 채팅의 메시지 저장
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [searchOpen, setSearchOpen] = useState(false); // 검색창 토글 상태
    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 토글 상태
    const messagesEndRef = useRef(null); // 채팅창 스크롤 관리

    useEffect(() => {
        setMessages(selectedChat.messages); // 선택된 채팅이 변경되면 messages 업데이트
    }, [selectedChat]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage = { text: input, sender: "user", time: format(new Date(), "yyyy-MM-dd HH:mm") };
        setMessages((prev) => [...prev, newMessage]); // 새 메시지 추가
        setInput("");
    };

    const deleteChat = () => {
        if (window.confirm("정말로 대화를 삭제하시겠습니까?")) {
            setMessages([]); // 모든 메시지 삭제
            setMenuOpen(false); // 메뉴 닫기
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

                {/* 검색 버튼 + 메뉴 버튼 */}
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

                    {/* 메뉴 버튼 */}
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <MoreVertical className="w-6 h-6 text-gray-700" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 text-sm z-10">
                                <button onClick={deleteChat} className="block w-full text-left px-2 py-1 hover:bg-gray-100">대화 삭제</button>
                                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">디자이너 프로필 보기</button>
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
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
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

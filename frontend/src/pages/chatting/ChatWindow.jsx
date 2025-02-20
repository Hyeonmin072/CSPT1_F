import { useState } from "react";
import { format, isSameDay, parse } from "date-fns";
import { Search, MoreVertical } from "lucide-react"; // Lucide 아이콘 사용

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { text: "어떤 헤어스타일로 문의를 주셨을까요 고객님?!", sender: "designer", time: "2024-12-25 18:12" },
        { text: "파마를 한번 해보려고 하는데 잘 어울릴까요?!", sender: "user", time: "2024-12-25 18:16" },
        { text: "저희 샵에 방문해서 한번 보고 제가 추천드려도 될까요?", sender: "designer", time: "2024-12-26 10:30" },
    ]);
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [searchOpen, setSearchOpen] = useState(false); // 검색창 보이기/숨기기 상태
    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 추가

    const sendMessage = () => {
        if (!input.trim()) return;
        const currentTime = format(new Date(), "yyyy-MM-dd HH:mm");
        setMessages([...messages, { text: input, sender: "user", time: currentTime }]);
        setInput("");
    };

    // 검색 기능: 검색어가 포함된 메시지만 필터링
    const filteredMessages = messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteChat = () => {
        if (window.confirm("정말로 대화를 삭제하시겠습니까?")) {
            setMessages([]); // 모든 메시지 삭제
            setMenuOpen(false); // 메뉴 닫기
        }
    };

    return (
        <div className="flex flex-col w-full h-[90vh] bg-white">
            {/* 채팅 헤더 */}
            <div className="mt-[18px] p-4 bg-white shadow-md flex justify-between items-center">
                <span className="text-lg font-bold">디자이너 B</span>

                {/* 검색 버튼 + 메뉴 버튼 */}
                <div className="flex items-center space-x-3">
                    {/* 돋보기 아이콘 (클릭 시 검색창 토글) */}
                    <button onClick={() => setSearchOpen(!searchOpen)}>
                        <Search className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* 검색창 (searchOpen이 true일 때만 표시) */}
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

                        {/* 메뉴 드롭다운 */}
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 text-sm">
                                <button onClick={deleteChat} className="block w-full text-left px-2 py-1 hover:bg-gray-100">대화 삭제</button>
                                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">디자이너 프로필 보기</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 채팅 메시지 */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-blue-100">
                {filteredMessages.map((msg, index) => {
                    const currentMessageDate = parse(msg.time, "yyyy-MM-dd HH:mm", new Date());
                    const previousMessageDate = index > 0
                        ? parse(filteredMessages[index - 1].time, "yyyy-MM-dd HH:mm", new Date())
                        : null;

                    const showDate = !previousMessageDate || !isSameDay(currentMessageDate, previousMessageDate);

                    return (
                        <div key={index}>
                            {showDate && (
                                <div className="text-center my-2 text-gray-500 text-sm">
                                    {format(currentMessageDate, "yyyy년 MM월 dd일")}
                                </div>
                            )}
                            <div className={`relative max-w-[75%] w-fit p-2 rounded-md 
                                ${msg.sender === "user" ? "bg-green-400 text-white ml-auto self-end" : "bg-white self-start"}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <span className="block text-right text-xs text-gray-400 w-full">
                                    {format(currentMessageDate, "HH:mm")}
                                </span>
                            </div>
                        </div>
                    );
                })}
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

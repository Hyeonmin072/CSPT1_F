import { useState } from "react"

const ChatWindow = () => {
    const [messages,setMessages] = useState([
        { text: "어떤 헤어스타일로 문의를 주셨을까요 고객님?!", sender: "designer", time: "18:12"},
        { text: "파마를 한번 해보려고 하는데 잘 어울릴까요?!", sender: "user", time: "18:16"},
        { text: "저희 샵에 방문해서 한번 보고 제가 추천드려도 될까요?", sender: "designer", time: "18:18"}
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, sender: "user", time: new Date().toLocaleString() }]);
        setInput("");
    };
    return (
        <div className={"flex flex-col w-full h-screen bg-gray-100"}>
        {/*  채팅 헤더  */}
            <div className={"p-4 bg-white shadow-md"}>디자이너 B</div>

        {/* 채팅 메시지 */}
            <div className={"flex-1 p-4 space-y-2 overflow-y-auto bg-blue-100"}>
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-green-400 text-white self-end" : "bg-white"}`}>
                        <p>{msg.text}</p>
                        <span className={"text-xs"}>{msg.time}</span>
                    </div>
                ))}
            </div>

        {/* 메시지 입력창 */}
            <div className={"p-4 bg-white flex items-center"}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>e.key === "Enter" && sendMessage()}
                    placeholder="Message..."
                    className={"flex-1 border border-gray-300 p-2 rounded-md"}/>
                <button onClick={sendMessage} className={"ml-2 p-2 bg-blue-500 text-white rounded-md"}>Send</button>
            </div>

        </div>


    );
};
export default ChatWindow;
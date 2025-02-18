import ChatSidebar from "../../components/chat/ChatSidebar.jsx";
import ChatWindow from "./ChatWindow";

const ChattingPage = () => {
    return (
        <div className="flex w-full h-auto bg-white justify-center items-center">
            <div className={"flex w-full max-w-[1300px] h-[90vh] bg-white rounded-lg overflow-hidden"}>
                {/* 채팅 목록 */}
                <ChatSidebar />

                {/* 채팅창 */}
                <ChatWindow />
            </div>
        </div>
    );
};

export default ChattingPage;

import { useState } from "react"
import { Search } from 'lucide-react';

const ChatSidebar = ({ setSelectedChat, selectedChat}) => {

    const chats = [
        { id: 1, name: "디자이너A", lastMessage: "너무 잘 어울려요!!", time: "18:00"},
        { id: 2, name: "디자이너B", lastMessage: "저희 샵에 방문해서 한번 보고 제가 추천드려도 될까요?", time: "18:18"},
        { id: 3, name: "디자이너C", lastMessage: "파마가 잘 어울리실거 같아요!!", time: "18:03"},
        { id: 4, name: "디자이너D", lastMessage: "계란형 얼굴에는 어떤 헤어가 어울려요!!", time: "18:03"}
    ];

    return (
        <div className={"w-1/4 h-screen bg-white border-r"}>
        {/* 검색창 */}
            <div className={"p-4 border-b"}>
                <div className={"flex items-center border rounded-xl"}>
                    {/* search 아이콘*/}
                    <Search size={20} className={"text-gray-500 ml-2"}/>

                <input
                    type="text"
                    placeholder="검색"
                    className={"w-full p-2 mt-0 focus:outline-none border-none rounded-xl"}/>
                </div>
            </div>

        {/* 채팅목록 */}
            <div className={"overflow-y-auto"}>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={"p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer"}
                        onClick={() => setSelectedChat(chat)}>
                        <div>
                            <p className={"font-semibold"}>{chat.name}</p>
                            <p className={"text-sm text-gray-500"}>{chat.lastMessage}</p>
                        </div>
                        <span className={"text-xs text-gray-400"}>{chat.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
import { useState, useCallback } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import useStompClient from "./useStompClient";
import Header from "../../components/common/Header";

const ChattingPage = ({ token }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // 새 메시지 왔을 때 처리 함수
  const onNewMessage = useCallback(
    (newMessage) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.chatRoomId === newMessage.chatRoomId
            ? {
                ...chat,
                lastMessage: newMessage.content,
                sendDate: newMessage.sendDate,
              }
            : chat
        )
      );

      // 선택한 채팅방에 새 메시지 추가
      setSelectedChat((prev) => {
        if (!prev || prev.chatRoomId !== newMessage.chatRoomId) return prev;
        return { ...prev, messages: [...(prev.messages || []), newMessage] };
      });
    },
    [setChats, setSelectedChat]
  );

  // STOMP 클라이언트 세팅 및 채팅방들 구독
  const stompClient = useStompClient(chats, onNewMessage);

  return (
    <div>
      <Header />
      {/* 헤더가 fixed면 padding-top으로 헤더 높이만큼 공간 확보 */}
      <main className="pt-20 flex justify-center items-center">
        <div className="flex w-full h-[90vh] max-w-[1300px] bg-white rounded-lg overflow-auto">
          {!selectedChat ? (
            // 선택된 채팅방 없으면 사이드바만 크게 보여주기 + 가운데 정렬
            <div className="flex-1 flex justify-center">
              <ChatSidebar
                chats={chats}
                setChats={setChats}
                setSelectedChat={setSelectedChat}
                token={token}
                className="w-full max-w-lg"
              />
            </div>
          ) : (
            // 선택된 채팅방 있으면 채팅창만 크게 보여주기
            <ChatWindow
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              socket={stompClient}
              token={token}
              className="flex-1"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ChattingPage;

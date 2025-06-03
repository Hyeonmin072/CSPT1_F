import { useState, useCallback } from "react";
import ChatSidebar from "../../components/chat/DesignerChatSidebar";
import ChatWindow from "../../components/chat/DesignerWindow";
import useStompClient from "./useStompClient";
import Header from "../../components/common/DesignerHeader";

const DesignerChattingPage = ({ token }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const onNewMessage = useCallback(
    (newMessage) => {
      setChats((prev) => {
        // 해당 채팅방 있으면 업데이트
        const chatExists = prev.some(chat => chat.chatRoomId === newMessage.chatRoomId);
        let updated;
        console.log("새로온 메세지의 read:",newMessage.read);
        if (chatExists) {
          updated = prev.map(chat =>
            chat.chatRoomId === newMessage.chatRoomId
              ? {
                  ...chat,
                  lastMessage: newMessage.content,
                  sendDate: newMessage.sendDate,
                  hasNewMessage: true,
                  unreadCount: (Number(chat.unreadCount) || 0) + (newMessage.read ? 0 : 1),
                }
              : chat
          );
        } else {
          // 새 채팅방이라면 추가
          updated = [
            ...prev,
            {
              chatRoomId: newMessage.chatRoomId,
              lastMessage: newMessage.content,
              sendDate: newMessage.sendDate,
              hasNewMessage: true,
              // 필요한 다른 초기값도 넣어주세요.
              partnerName: newMessage.sender, // 예시
              messages: [newMessage],
            },
          ];
        }

        console.log("Chats 업데이트:", updated);
        return updated;
      });
    }
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

export default DesignerChattingPage;

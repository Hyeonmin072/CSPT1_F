import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const useStompClient = (chats, onNewMessage) => {
  const stompClient = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:1271/ws-connect",
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("STOMP 연결 성공");
    };

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!stompClient.current || !stompClient.current.connected) return;

    // 기존 구독 해제
    if (stompClient.current.subscriptions) {
    Object.values(stompClient.current.subscriptions).forEach((sub) => {
        sub.unsubscribe();
    });
    }


    // 모든 채팅방 구독
    chats.forEach((chat) => {
      stompClient.current.subscribe(
        `/subscribe/chat/${chat.chatRoomId}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("새 메시지 도착:", newMessage);  // 여기에 로그 추가
          onNewMessage(newMessage);
        }
      );
    });
  }, [chats, onNewMessage]);

  return stompClient.current;
};

export default useStompClient;

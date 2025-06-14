import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const useStompClient = (chats, onNewMessage) => {
  const stompClient = useRef(null);
  const subscriptions = useRef({});
  const isConnected = useRef(false);
  const latestChats = useRef([]);
  const latestCallback = useRef(onNewMessage);

  // 최신 콜백 참조 업데이트
  useEffect(() => {
    latestCallback.current = onNewMessage;
  }, [onNewMessage]);

  // 최신 chats 업데이트
  useEffect(() => {
    latestChats.current = chats;
    if (!isConnected.current || !stompClient.current || !stompClient.current.connected) return;

    // 새로운 채팅방만 구독
    chats.forEach((chat) => {
      if (!subscriptions.current[chat.chatRoomId]) {
        const sub = stompClient.current.subscribe(
          `/subscribe/chat/${chat.chatRoomId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            console.log("새 메시지 도착:", newMessage);
            latestCallback.current(newMessage);
          }
        );
        subscriptions.current[chat.chatRoomId] = sub;
      }
    });

    // 구독되지 않은 채팅방 제거
    Object.keys(subscriptions.current).forEach((roomId) => {
      if (!chats.some((chat) => chat.chatRoomId === roomId)) {
        subscriptions.current[roomId].unsubscribe();
        delete subscriptions.current[roomId];
      }
    });
  }, [chats]);

  // STOMP 클라이언트 연결 설정
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://13.125.168.206:1271/ws-connect",
      reconnectDelay: 30000,
    });

    client.onConnect = () => {
      console.log("STOMP 연결 성공");
      isConnected.current = true;

      // 연결되었을 때 현재 chats 기준으로 구독 설정
      latestChats.current.forEach((chat) => {
        if (!subscriptions.current[chat.chatRoomId]) {
          const sub = client.subscribe(
            `/subscribe/chat/${chat.chatRoomId}`,
            (message) => {
              const newMessage = JSON.parse(message.body);
              console.log("새 메시지 도착:", newMessage);
              latestCallback.current(newMessage);
            }
          );
          subscriptions.current[chat.chatRoomId] = sub;
        }
      });
    };

    client.activate();
    stompClient.current = client;

    return () => {
      isConnected.current = false;
      Object.values(subscriptions.current).forEach((sub) => sub.unsubscribe());
      subscriptions.current = {};
      client.deactivate();
    };
  }, []);

  return stompClient.current;
};

export default useStompClient;

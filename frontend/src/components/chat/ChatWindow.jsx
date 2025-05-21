import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../axios/AxiosInstance";

const ChatWindow = ({ selectedChat, setSelectedChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const subscriptionRef = useRef(null);
  const chatContainerRef = useRef(null);


  // 뒤로가기 버튼
  const handleBack = () => {
    setSelectedChat(null);
  };

  // 첨부파일 초기화 버튼
  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    };


  useEffect(() => {
    if (!selectedChat) return;

    axiosInstance
      .post(`/user/chatroom/join/${selectedChat.chatRoomId}`)
      .then((res) => {
        setMessages(res.data);
        setSelectedChat((prev) => ({
          ...prev,
          messages: res.data,
        }));
        console.log("메시지 불러오기 성공");
      })
      .catch((err) => {
        console.error("메시지 불러오기 실패", err);
      });
  }, [selectedChat?.chatRoomId, setSelectedChat]);

  useEffect(() => {
    if (!socket || !socket.connected || !selectedChat) return;

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    subscriptionRef.current = socket.subscribe(
      `/subscribe/chat/${selectedChat.chatRoomId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("실시간 새 메시지 도착:", newMessage);

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setSelectedChat((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), newMessage],
        }));
      }
    );

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [socket, selectedChat, setSelectedChat]);

  useEffect(() => {
    if (!selectedChat?.messages) return;
    setMessages(selectedChat.messages);
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;
    if (!selectedChat || !socket || !socket.connected) return;

    let fileUrls = null;
    let messageType = "TEXT";

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("file", file));

      try {
        const res = await axiosInstance.post(
          `/chat/fileupload/${selectedChat.chatRoomId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("파일 업로드 로그:",res);
        fileUrls = res.data.fileUrls;
        messageType = res.data.messageType;
      } catch (err) {
        console.error("파일 업로드 실패", err);
        return;
      }
    }

    const messageDto = {
      content: input,
      sendDate: new Date().toISOString(),
      fileUrls,
      messageType,
    };

    console.log('📤 메시지 전송 시도:', {
        destination: `/publish/chat/${selectedChat.chatRoomId}`,
        body: messageDto,
        });

    socket.publish({
      destination: `/publish/chat/${selectedChat.chatRoomId}`,
      body: JSON.stringify(messageDto),
    });

    setInput("");
    setFiles([]);
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-lg max-w-2xl mx-auto" style={{ height: "100%" }}>
      <div className="mb-4">
        <button onClick={handleBack} className="text-blue-600 hover:text-blue-800 font-semibold">
          ← 뒤로가기
        </button>
      </div>

      <h2 className="font-extrabold mb-6 text-2xl text-gray-800 border-b pb-3">
        {selectedChat ? `💬 ${selectedChat.partnerName}` : "채팅방을 선택하세요"}
      </h2>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 border rounded-lg bg-gray-50 shadow-inner scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ minHeight: "0px" }}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 italic mt-20 select-none">
            대화 내용이 없습니다.
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.sender === "me";

          return (
            <div
              key={idx}
              className={`mb-4 flex flex-col max-w-[75%] ${
                isMe ? "items-end ml-auto" : "items-start mr-auto"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl whitespace-pre-wrap break-words shadow-sm ${
                  isMe
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-900"
                }`}
              >
                {msg.content}
                {msg.fileUrls && msg.fileUrls.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {msg.fileUrls.map((url, i) => {
                    const fileExtension = url.split('.').pop().toLowerCase();
                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                    const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(fileExtension);

                    if (isImage) {
                        return (
                        <img
                            key={i}
                            src={url}
                            alt={`첨부 이미지 ${i + 1}`}
                            className="max-w-[200px] max-h-[200px] rounded-lg shadow border"
                        />
                        );
                    } else if (isVideo) {
                        return (
                        <video
                            key={i}
                            controls
                            src={url}
                            className="max-w-[200px] max-h-[200px] rounded-lg shadow border"
                        />
                        );
                    } else {
                        return (
                        <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 underline hover:text-blue-800 transition"
                        >
                            📎 파일 {i + 1}
                        </a>
                        );
                    }
                    })}
                </div>
                )}
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <div className="text-xs text-gray-400 select-none">
                  {new Date(msg.sendDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {isMe && (
                  <div
                    className="text-xs select-none"
                    style={{ color: msg.isRead ? "#3b82f6" : "#999" }}
                  >
                    {msg.isRead ? "읽음 ✓" : "안읽음 🔴"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 선택한 파일 UI */}
        {files.length > 0 && (
        <div className="mt-3 p-3 border rounded-lg bg-yellow-50 text-sm text-gray-700 shadow-inner">
            <div className="font-semibold mb-2">📎 첨부된 파일:</div>
            <ul className="list-disc list-inside space-y-1">
            {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button
                    onClick={() => handleRemoveFile(i)}
                    className="ml-2 text-red-500 text-xs hover:underline"
                >
                    삭제
                </button>
                </li>
            ))}
            </ul>
        </div>
        )}

      <div className="flex items-center space-x-3 mt-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-full p-2 bg-green-100 hover:bg-green-200 transition shadow-md"
          title="파일 선택"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 11-2.828-2.828L12.343 4m0 0L15.172 7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.414 15.414a2 2 0 01-2.828 0L8 6.828" />
          </svg>
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="hidden"
        />

        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-3xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-lg font-semibold transition"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

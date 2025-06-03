// src/components/chat/DesignerChatSidebar.jsx
import { useEffect } from "react";
import axiosInstance from "../../axios/AxiosInstance";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import timezone from "dayjs/plugin/timezone"; 
import utc from "dayjs/plugin/utc";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// dayjs 설정
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale("ko");


// 기본 프로필 아이콘
const DefaultProfileIcon = () => (
  <svg
    className="w-14 h-14 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const DesignerChatSidebar = ({
  chats,
  setChats,
  setSelectedChat,
  selectedChat,
  className = "",
}) => {
  useEffect(() => {
    axiosInstance
      .get("/designer/chatroom")
      .then((res) => {
        setChats(res.data);
        console.log("채팅창 목록 데이터:",res.data);
      })
      .catch((err) => console.error("❌ 채팅방 목록 조회 실패", err));
  }, [setChats]);

  const handleDeleteChat = (chatRoomId) => {
    Swal.fire({
      title: "정말 나가시겠어요?",
      text: "채팅방을 나가면 대화 내용을 다시 볼 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "나가기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/designer/chatroom/${chatRoomId}`)
          .then(() => {
            setChats((prev) => prev.filter((c) => c.chatRoomId !== chatRoomId));
            if (selectedChat?.chatRoomId === chatRoomId) {
              setSelectedChat(null);
            }
            Swal.fire({
              title: "삭제 완료",
              text: "채팅방을 나갔습니다.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.error("❌ 채팅방 삭제 실패", err);
            Swal.fire("오류 발생", "채팅방을 나갈 수 없습니다.", "error");
          });
      }
    });
  };

  return (
      <div
        className={`w-pull flex flex-col items-center justify-start p-4 bg-white shadow-md h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-l-lg ${className}`}
      >
        <h2 className="text-2xl font-bold mb-6 w-full text-center text-gray-800 border-b border-gray-300 pb-3 select-none">
          💬 채팅방 목록
        </h2>
  
        {chats.length === 0 ? (
          <div className="text-gray-400 mt-20 text-center text-lg select-none">
            아직 대화가 없어요.
          </div>
        ) : (
          chats.map((chat) => {
            const isSelected = selectedChat?.chatRoomId === chat.chatRoomId;
            return (
              <div
                key={chat.chatRoomId}
                className={`w-full flex items-center justify-between cursor-pointer px-4 py-3 mb-2 rounded-xl transition-colors duration-200 hover:bg-blue-50 ${
                  isSelected ? "bg-blue-100 shadow-md" : "bg-white"
                }`}
                style={{ height: 90 }}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="relative">
                    {chat.partnerImage ? (
                      <img
                        src={chat.partnerImage}
                        alt="프로필"
                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <DefaultProfileIcon />
                    )}
  
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                      </div>
                    )}
                  </div>
  
                  <div className="flex-1 min-w-0 h-full flex flex-col justify-between leading-tight">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900 truncate max-w-[160px]">
                        {chat.partnerName || "이름 없음"}
                      </p>
                      {chat.sendDate && (
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {dayjs(chat.sendDate).tz("Asia/Seoul").fromNow()}
                        </span>
                      )}
                    </div>
  
                    <p className="text-gray-600 text-sm mt-1 line-clamp-1 max-w-[240px]">
                      {chat.lastMessage || ""}
                    </p>
                  </div>
                </div>
  
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.chatRoomId);
                  }}
                  className="ml-3 p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors duration-150 flex items-center justify-center"
                  aria-label="채팅방 나가기"
                  title="채팅방 나가기"
                  type="button"
                  style={{ minWidth: 38, minHeight: 38 }}
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    );
};

export default DesignerChatSidebar;

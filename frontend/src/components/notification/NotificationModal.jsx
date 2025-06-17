import { useState, useEffect } from "react";

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // SSE로 받은 알림 데이터를 localStorage에서 가져오기
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      // receiverEmail을 제외한 필요한 데이터만 추출
      const parsedNotifications = JSON.parse(storedNotifications).map(
        ({ title, content, time }) => ({
          title,
          content,
          time,
        })
      );
      setNotifications(parsedNotifications);
    }
  }, []);

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[85]"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 w-[370px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[90]
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">알림</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.time}
                className={`p-4 border-b ${
                  notification.isRead ? "bg-white" : "bg-blue-50"
                }`}
              >
                <p className="font-bold">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(notification.time).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              새로운 알림이 없습니다
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;

import { Overlay } from "../overlay/OverLay";

const NotificationModal = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "예약 알림",
      message: "내일 오후 2시 예약이 확정되었습니다.",
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: 2,
      title: "예약 알림",
      message: "알빠노",
      timestamp: new Date(),
      isRead: true,
    },
    {
      id: 3,
      title: "예약 알림",
      message: "형섭이 바보",
      timestamp: new Date(),
      isRead: true,
    },
    {
      id: 4,
      title: "예약 알림",
      message: "천수야 아침에 나온다고 했잖아아",
      timestamp: new Date(),
      isRead: true,
    },
    {
      id: 5,
      title: "예약 알림",
      message: "이러면 디자이너가 저희 앱을 왜 씁니까",
      timestamp: new Date(),
      isRead: true,
    },
  ];

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div
        className={`fixed top-0 right-0 w-[370px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
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
                key={notification.id}
                className={`p-4 border-b ${
                  notification.isRead ? "bg-white" : "bg-blue-50"
                }`}
              >
                <p className="font-bold">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-400">
                  {notification.timestamp.toLocaleString()}
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

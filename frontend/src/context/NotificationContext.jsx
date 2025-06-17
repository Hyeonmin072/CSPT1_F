// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 초기 로드시 로컬스토리지에서 알림 불러오기
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // 알림 추가
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      message: notification,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
    setUnreadCount((prev) => prev + 1);
  };

  // 알림 읽음 처리
  const markAsRead = (notificationId) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => ({ ...notif, read: true }));
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
    setUnreadCount(0);
  };

  // 알림 삭제
  const deleteNotification = (notificationId) => {
    setNotifications((prev) => {
      const updated = prev.filter((notif) => notif.id !== notificationId);
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);

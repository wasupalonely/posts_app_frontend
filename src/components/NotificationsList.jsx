import React, { useRef, useCallback } from 'react';
import Notification from './Notification';
import StatusMessage from './StatusMessage';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NotificationsList = ({ notifications, loading, hasMore, loadMoreNotifications }) => {
  const observer = useRef();

  const lastNotificationElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreNotifications();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreNotifications]);

  return (
    <div>
      {notifications.length > 0 ? notifications.map((notification, index) => {
        if (notifications.length === index + 1) {
          return (
            <div ref={lastNotificationElementRef} key={notification._id}>
              <Notification
                id={notification._id}
                title={notification.title}
                content={notification.content}
                seen={notification.seen}
                type={notification.type}
                metadata={notification.metadata || {}}
                from={notification.from}
                to={notification.to}
              />
            </div>
          );
        } else {
          return (
            <Notification
              key={notification._id}
              id={notification._id}
              title={notification.title}
              content={notification.content}
              seen={notification.seen}
              type={notification.type}
              metadata={notification.metadata || {}}
              from={notification.from}
              to={notification.to}
            />
          );
        }
      }) : (
        <StatusMessage type="empty" message="No tienes notificaciones!" />
      )}
      {loading && (
        <div>
          {Array(5).fill().map((_, index) => (
            <div key={index} className="p-4 mb-2 border rounded bg-gray-900 text-white">
              <Skeleton height={20} width={`60%`} baseColor="#333" highlightColor="#444" />
              <Skeleton height={20} width={`80%`} baseColor="#333" highlightColor="#444" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;

import React from 'react';
import Notification from './Notification';
import StatusMessage from './StatusMessage';

const NotificationsList = ({ notifications }) => {
  return (
    <div>
      {notifications.length > 0 ? notifications.map((notification) => (
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
      )) : <StatusMessage type="empty" message="No tienes notificaciones!" />}
    </div>
  );
};

export default NotificationsList;

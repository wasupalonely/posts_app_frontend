import React from 'react';
import Notification from './Notification';

const NotificationsList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification._id}
          title={notification.title}
          content={notification.content}
          seen={notification.seen}
          type={notification.type}
          metadata={notification.metadata || {}}
          from={notification.from}
          to={notification.to}
        />
      ))}
    </div>
  );
};

export default NotificationsList;

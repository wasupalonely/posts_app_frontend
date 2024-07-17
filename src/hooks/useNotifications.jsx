import axios from "axios";
import React, { useEffect, useState } from "react";

const useNotifications = () => {
  const myId = JSON.parse(localStorage.getItem("user"))._id;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchMyNotifications = async () => {
      const notifications = await axios.get(
        `http://localhost:3000/api/v1/notifications/receiver/${myId}`,
        config
      );
      console.log("NOTIFICATIONS", notifications.data);

      setNotifications(notifications.data);
    };

    fetchMyNotifications();
  }, []);

  const handleClickNotification = async (notification) => {
    
  };

  return {
    notifications,
  };
};

export default useNotifications;

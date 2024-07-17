import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "react-transition-group";

const useNotifications = () => {
  const myId = JSON.parse(localStorage.getItem("user"))._id;
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  useEffect(() => {
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

  const handleSendNotification = async (notification) => {
    await axios.post(
      "http://localhost:3000/api/v1/notifications",
      notification,
      config
    );
  };

  const handleClickNotification = async (notification) => {
    switch (notification.type) {
      case "follow":
        break;
      case "like":
        break;
      case "comment":
        break;
      case "message":
        break;
      default:
        break;
    }
  };

  return {
    notifications,
  };
};

export default useNotifications;

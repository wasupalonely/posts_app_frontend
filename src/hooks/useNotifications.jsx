import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useNotifications = () => {
  const myId = JSON.parse(localStorage.getItem("user"))._id;
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchNotifications = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/notifications/receiver/${myId}?page=${page}`,
        config
      );
      const newNotifications = response.data;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...newNotifications,
      ]);
      setHasMore(newNotifications.length > 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications(page);
  }, [page, fetchNotifications]);

  const loadMoreNotifications = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    notifications,
    loading,
    hasMore,
    loadMoreNotifications,
  };
};

export default useNotifications;

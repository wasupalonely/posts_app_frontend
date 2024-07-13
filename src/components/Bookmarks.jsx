import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import PostsList from "./PostsList";

const Bookmarks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getBookmarks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `http://localhost:3000/api/v1/posts/${id}/bookmarks`,
        config
      );
      console.log("🚀 ~ getBookmarks ~ res:", res);
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);
  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="p-4">
        <PostsList posts={bookmarks} />
      </div>
    </div>
  );
};

export default Bookmarks;

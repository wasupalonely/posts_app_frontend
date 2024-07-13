import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Sidebar from "./Sidebar";

const Feed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get("http://localhost:3000/api/v1/posts", config);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, config);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white lg:hidden">
          <button onClick={toggleSidebar} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="p-4">
            <CreatePost onPostCreated={handlePostCreated} />
            <PostsList posts={posts} handleDeletePost={handleDeletePost} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feed;

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Sidebar from "./Sidebar";

const Feed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("authToken");
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

      await axios.delete(
        `http://localhost:3000/api/v1/posts/${postId}`,
        config
      );
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      await axios.post(
        `http://localhost:3000/api/v1/posts/${postId}/like`,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(id)
                  ? post.likes.filter((likeId) => likeId !== id)
                  : [...post.likes, id],
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleBookmarkPost = async (postId) => {
    try {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      await axios.post(
        `http://localhost:3000/api/v1/users/${id}/bookmark`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                bookmarks: post.bookmarks.includes(id)
                  ? post.bookmarks.filter((bm) => bm !== id)
                  : [...post.bookmarks, id],
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error bookmarking post:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePostCreated = (post) => {
    setPosts((prevPosts) => [post.data, ...prevPosts]);
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
            <PostsList
              posts={posts}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikePost}
              handleBookmarkPost={handleBookmarkPost}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feed;

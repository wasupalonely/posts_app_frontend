import { useEffect, useState } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Sidebar from "./Sidebar";
import usePosts from "../hooks/usePosts";

const Feed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    posts,
    handleDeletePost,
    handleLikePost,
    handleBookmarkPost,
    handlePostCreated,
    loading,
    error,
    fetchPosts,
  } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} section={"home"} />
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
              loading={loading}
              error={error}
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

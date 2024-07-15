import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import PostsList from "./PostsList";
import usePosts from "../hooks/usePosts";
import Header from "./Header";

const Bookmarks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { bookmarks, loading, error, fetchBookmarks, handleBookmarkPost, handleLikePost } = usePosts();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} section={"bookmarks"} />
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
          <PostsList loading={loading} error={error} posts={bookmarks} handleBookmarkPost={handleBookmarkPost} handleLikePost={handleLikePost} />
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default Bookmarks;

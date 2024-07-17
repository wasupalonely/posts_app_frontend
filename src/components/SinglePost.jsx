import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts";
import usePosts from "../hooks/usePosts";
import { getUserById } from "../api/users";
import Header from "./Header";

const SinglePost = () => {
  const { postId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const { handleAddComment, handleLikePost, handleBookmarkPost, handleDeletePost } = usePosts();

  const id = JSON.parse(localStorage.getItem("user"))._id;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response);

        const user = await getUserById(response.authorId);
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    getPostData();
  }, []);
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        section={"bookmarks"}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="p-4">
            <Post
              handleAddComment={handleAddComment}
              post={post}
              handleBookmarkPost={handleBookmarkPost}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikePost}
              id={id}
              user={user}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SinglePost;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts";
import usePosts from "../hooks/usePosts";
import { getUserById } from "../api/users";
import Header from "./Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SinglePost = () => {
  const { postId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { handleAddComment, handleLikePost, handleBookmarkPost, handleDeletePost } = usePosts();

  const id = JSON.parse(localStorage.getItem("user"))?._id;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const getPostData = async () => {
      setLoading(true); // Comienza a cargar
      try {
        const response = await getPostById(postId);
        console.log("🚀 ~ getPostData ~ response:", response);
        setPost(response);

        const user = await getUserById(response.authorId);
        setUser(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Termina de cargar
      }
    };

    if (postId) {
      getPostData();
    }
  }, [postId]);

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
            {loading ? (
              <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Skeleton height={40} width={40} circle={true} baseColor="#333" highlightColor="#444" />
                  <div className="ml-2">
                    <Skeleton height={20} width={100} baseColor="#333" highlightColor="#444" />
                  </div>
                </div>
                <Skeleton height={20} width={`60%`} baseColor="#333" highlightColor="#444" />
                <Skeleton height={20} width={`80%`} baseColor="#333" highlightColor="#444" />
                <Skeleton height={200} baseColor="#333" highlightColor="#444" />
              </div>
            ) : post ? (
              <Post
                handleAddComment={handleAddComment}
                post={post}
                handleBookmarkPost={handleBookmarkPost}
                handleDeletePost={handleDeletePost}
                handleLikePost={handleLikePost}
                id={id}
                user={user}
              />
            ) : (
              <div>Post not found</div> // Mensaje de error si no se encuentra el post
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SinglePost;

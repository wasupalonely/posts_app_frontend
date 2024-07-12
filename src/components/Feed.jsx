import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Sidebar from "./Sidebar";

const Feed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para cargar los posts
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

  // Cargar los posts al cargar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para manejar la eliminación de un post
  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, config);
      // Actualizar la lista de posts después de eliminar uno
      setPosts(posts.filter((post) => post._id !== postId));
      setSuccessMessage("Post eliminado exitosamente!");
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al eliminar el post, por favor intente de nuevo.");
      setSuccessMessage("");
    }
  };

  // Función para alternar entre abrir y cerrar la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white lg:hidden">
          <button onClick={toggleSidebar} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Feed</h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          {/* Encabezado */}
          <Header />
          {/* Contenido principal */}
          <div className="p-4">
            {/* Formulario de publicación de posts */}
            <CreatePost />
            {/* Mostrar posts */}
            <PostsList posts={posts} handleDeletePost={handleDeletePost} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feed;

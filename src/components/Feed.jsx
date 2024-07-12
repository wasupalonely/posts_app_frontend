import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

const Feed = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [posts, setPosts] = useState([]);

  // Estados para el formulario de nuevo post
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
      console.log("🚀 ~ fetchPosts ~ res:", res.data)
      setPosts(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // Cargar los posts al cargar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Implementación de paginación infinita
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      fetchPosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  // Función para manejar la eliminación de un post
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
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Barra lateral */}
        {/* <aside
          className={`w-64 bg-gray-800 shadow-lg ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div className="p-4 flex items-center justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/chat")}
            >
              Mensajes
            </button>
          </div>
        </aside> */}

        {/* Contenido principal */}
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
    </>
  );
};

export default Feed;

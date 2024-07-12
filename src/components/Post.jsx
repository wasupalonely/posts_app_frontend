import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Estado para controlar si el sidebar está abierto o cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Estados para manejar los posts y la paginación
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Estados para el formulario de nuevo post
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar la selección de imágenes y mostrar la previsualización
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Función para manejar el envío del formulario de publicación de posts
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post('http://localhost:3000/api/v1/posts', formData, config);

      // Actualizar la lista de posts después de subir uno nuevo
      setPosts([res.data.post, ...posts]);
      setContent('');
      setImage(null);
      setImagePreview(null);
      setSuccessMessage('Post subido exitosamente!');
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Error al subir el post, por favor intente de nuevo.');
      setSuccessMessage('');
    }
  };

  // Función para cargar los posts
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      };

      const res = await axios.get('http://localhost:3000/api/v1/posts', config);
      const newPosts = res.data.posts;

      if (newPosts.length === 0) {
        setHasMore(false); // No hay más posts para cargar
      } else {
        setPosts([...posts, ...newPosts]);
        setPage(page + 1); // Incrementa la página para la siguiente carga
      }
    } catch (err) {
      console.error(err);
      // Manejar errores
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
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
      )
        return;
      fetchPosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);

  // Función para manejar la eliminación de un post
  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, config);
      // Actualizar la lista de posts después de eliminar uno
      setPosts(posts.filter(post => post._id !== postId));
      setSuccessMessage('Post eliminado exitosamente!');
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Error al eliminar el post, por favor intente de nuevo.');
      setSuccessMessage('');
    }
  };

  // Función para alternar entre abrir y cerrar la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Barra lateral */}
      <aside className={`w-64 bg-gray-800 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 flex items-center justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate('/chat')}
          >
            Mensajes
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">
        {/* Encabezado */}
        <header className="bg-gray-800 shadow-md p-4 flex items-center justify-between">
          {/* Logo e nombre de la app */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 110 14 7 7 0 010-14zm0 12a5 5 0 100-10 5 5 0 000 10z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-xl font-bold text-white">Nombre de la App</h1>
          </div>

          {/* Perfil */}
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img
                src="url_de_tu_imagen_de_perfil"
                alt="Imagen de perfil"
                className="h-8 w-8 rounded-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4zM2 8a6 6 0 1110.92 4.92l4.42 4.42a1 1 0 01-1.42 1.42l-4.42-4.42A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Opciones de perfil (popup) */}
            {/* Implementa el contenido del popup de opciones de perfil aquí */}
          </div>
        </header>

        {/* Contenido principal */}
        <div className="p-4">
          {/* Formulario de publicación de posts */}
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-white mb-2">Publicar un nuevo post</h2>
            {/* Input para texto del post */}
            <textarea
              className="w-full border border-gray-600 rounded-md p-2 mb-2 text-white bg-gray-700"
              placeholder="Escribe tu mensaje..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3" // Hace que el textarea sea estático y no editable
            ></textarea>
            {/* Input para selección de imágenes */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-600 rounded-md p-2 mb-2 text-white bg-gray-700"
              required
            />
            {/* Previsualización de la imagen seleccionada */}
            {imagePreview && (
              <img src={imagePreview} alt="Previsualización" className="max-w-full h-auto mb-2" />
            )}
            {/* Botón de enviar */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Publicar
            </button>
          </form>

          {/* Mostrar posts */}
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
              <p className="text-white">{post.content}</p>
              {post.media && post.media.length > 0 && (
                <div className="flex space-x-2 mt-2">
                  {post.media.map((media, index) => (
                    <img
                      key={index}
                      src={media}
                      alt={`Media ${index}`}
                      className="max-w-full h-auto rounded-md"
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {/* Mensajes de éxito o error */}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

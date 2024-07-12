import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    try {
      console.log("USER", JSON.parse(localStorage.getItem("user")))
      const authorId = JSON.parse(localStorage.getItem("user"))._id;
      const formData = new FormData();
      formData.append("content", content);
      formData.append("images", image);
      formData.append("authorId", authorId);
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:3000/api/v1/posts", formData, config);

      setContent("");
      setImage(null);
      setImagePreview(null);
      setSuccessMessage("Post subido exitosamente!");
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al subir el post, por favor intente de nuevo.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
      >
        <h2 className="text-lg font-bold text-white mb-2">
          Publicar un nuevo post
        </h2>
        {/* Input para texto del post */}
        <textarea
          className="w-full border border-gray-600 rounded-md p-2 mb-2 text-white bg-gray-700"
          placeholder="Escribe tu mensaje..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
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
          <img
            src={imagePreview}
            alt="Previsualización"
            className="max-w-full h-auto mb-2"
          />
        )}
        {/* Botón de enviar */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Publicar
        </button>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </>
  );
};

export default CreatePost;

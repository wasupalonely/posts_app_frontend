// CreatePost.jsx
import { useState } from "react";
import usePosts from "../hooks/usePosts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { createPost } = usePosts();

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

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageRemove = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      };

      const post = await createPost(content, image, onUploadProgress);
      setContent("");
      setImage(null);
      setImagePreview(null);
      onPostCreated(post);
      toast.success("Tu post ha sido creado! 🦄", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el post 😢", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
    >
      <h2 className="text-lg font-bold text-white mb-2">
        Publicar un nuevo post
      </h2>
      <textarea
        className="w-full border border-gray-600 rounded-md p-2 mb-2 text-white bg-gray-700 resize-none"
        placeholder="Escribe tu mensaje..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
        disabled={isLoading}
      ></textarea>

      <div className="flex items-center space-x-2 justify-between">
        <div className="relative cursor-pointer" onClick={handleImageClick}>
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Previsualización"
                className="w-32 h-32 object-cover rounded mb-2"
              />
              <button
                onClick={handleImageRemove}
                className="absolute top-[-8px] right-[-8px] bg-white text-black rounded-full p-1 flex items-center justify-center w-6 h-6"
                disabled={isLoading}
              >
                <box-icon name="x" size="sm" color="black"></box-icon>
              </button>
            </div>
          ) : (
            <box-icon
              type="solid"
              color="white"
              name="image-add"
              size="md"
            ></box-icon>
          )}
        </div>

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? `Subiendo post...` : "Publicar"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;

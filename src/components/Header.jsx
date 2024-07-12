import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
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

        <div className="relative">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="url_de_tu_imagen_de_perfil"
              alt="Imagen de perfil"
              className="h-8 w-8 rounded-full"
            />
          </button>

          <button onClick={() => navigate("/chat")}>
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
        </div>
      </header>
    </div>
  );
};

export default Header;

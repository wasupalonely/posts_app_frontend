import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/PostAppIcon.svg"; // Ruta al archivo SVG en assets

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if user data exists in localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const profilePic = userData ? userData.profilePicture : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header className="bg-gray-800 shadow-md p-4 flex items-center justify-between">
        {/* Logo e nombre de la app */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">PostApp</h1>
        </div>

        <div className="flex items-center space-x-4">

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={profilePic}
                alt="Imagen de perfil"
                className="h-8 w-8 rounded-full"
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 transition duration-200 ease-in-out transform origin-top-right">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cerrar sesión
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Ir a perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

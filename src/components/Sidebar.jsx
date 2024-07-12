import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Fondo oscuro para dispositivos móviles */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:flex lg:flex-col lg:w-64 lg:bg-gray-800 lg:overflow-y-auto z-50`}
      >
        <div className="flex items-center justify-between px-4 py-3 lg:py-4 bg-gray-900 lg:bg-gray-800">
          {/* <h2 className="text-lg font-semibold">Sidebar</h2> */}
          <button onClick={toggleSidebar} className="text-white lg:hidden">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="px-2 py-4 space-y-2">
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => navigate("/chat")}
          >
            <box-icon color="white" name="chat"></box-icon>
            <strong className="ml-2">Chat</strong>
          </button>
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => console.log("Profile")}
          >
            <box-icon color="white" name="user"></box-icon>
            <strong className="ml-2">Perfil</strong>
          </button>
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={handleLogout}
          >
            <box-icon color="white" name="log-out"></box-icon>
            <strong className="ml-2">Cerrar sesión</strong>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

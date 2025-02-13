import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import useNotifications from "../hooks/useNotifications";

const Sidebar = ({ isOpen, toggleSidebar, section }) => {
  const { logout } = useContext(AuthContext);
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const myId = JSON.parse(localStorage.getItem("user"))?._id;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Filtra las notificaciones no vistas
  const unseenNotifications = notifications.filter(notification => !notification.seen);

  return (
    <>
      {section === "chat" && (
        <div
          className={`fixed md:static top-0 left-0 h-full bg-gray-800 transition-transform transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } w-60 z-50`}
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:flex lg:flex-col lg:w-64 lg:bg-gray-800 lg:overflow-y-auto`}
      >
        <div >
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
            onClick={() => navigate("/")}
          >
            <box-icon color="white" type={section === "home" ? "solid" : "regular"} name="home"></box-icon>
            <strong className="ml-2">Inicio</strong>
          </button>
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => navigate(`/profile/${myId}`)}
          >
            <box-icon color="white" type={section === "profile" ? "solid" : "regular"} name="user"></box-icon>
            <strong className="ml-2">Perfil</strong>
          </button>
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => navigate("/chat")}
          >
            <box-icon color="white" type={section === "chat" ? "solid" : "regular"} name="chat"></box-icon>
            <strong className="ml-2">Mensajes</strong>
          </button>
          <button
            className="flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => navigate("/bookmarks")}
          >
            <box-icon color="white" type={section === "bookmarks" ? "solid" : "regular"} name="bookmark"></box-icon>
            <strong className="ml-2">Guardados</strong>
          </button>
          <button
            className="relative flex items-center px-4 py-2 text-white rounded hover:bg-gray-700"
            onClick={() => navigate("/notifications")}
          >
            <box-icon color="white" type={section === "notifications" ? "solid" : "regular"} name="bell"></box-icon>
            {unseenNotifications.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {unseenNotifications.length}
              </span>
            )}
            <strong className="ml-2">Notificaciones</strong>
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

import { useNavigate } from 'react-router-dom';
import PostIcon from '../assets/PostIcon.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div className="max-w-xl w-full">
        <img src={PostIcon} alt="Logo de la App" className="w-24 mx-auto mb-8" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Bienvenido a Nuestra Aplicación
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
          Conéctate, comparte y descubre nuevos contenidos. ¡Únete a nuestra comunidad!
        </p>
        <button
          onClick={handleStart}
          className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

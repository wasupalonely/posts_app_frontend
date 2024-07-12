import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/post');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white font-sans min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-xl text-center max-w-md w-full mx-4">
        <h1 className="text-3xl text-primary mb-4">Bienvenido a PostApp</h1>
        <p className="text-lg text-gray-800 mb-6">
          ¡Únete a la comunidad donde compartir y descubrir nuevos contenidos nunca ha sido tan fácil!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition-colors duration-300"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
          <button
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition-colors duration-300"
            onClick={handleRegister}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

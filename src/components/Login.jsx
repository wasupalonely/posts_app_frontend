import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import PostIcon from '../assets/PostIcon.png';

const Login = () => {
  const { login, isAuthenticated, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={PostIcon} alt="Logo de la App" className="w-16 sm:w-24 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Bienvenido de nuevo</h2>
          <p className="text-gray-600 dark:text-gray-400">Inicia sesión en tu cuenta</p>
        </div>
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Nombre de usuario o correo electrónico</label>
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              type="text"
              placeholder="Escribe tu nombre de usuario o correo electrónico"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Contraseña</label>
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              type="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-500 hover:underline dark:text-blue-300">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

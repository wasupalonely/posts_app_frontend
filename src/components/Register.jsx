import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostIcon from '../assets/PostIcon.png'; // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccessMessage('Cuenta creada exitosamente. Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirigir después de 3 segundos
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={PostIcon} alt="Logo de la App" className="w-16 sm:w-24 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Crear una cuenta</h2>
          <p className="text-gray-600 dark:text-gray-400">Regístrate para empezar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Nombre de usuario</label>
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              type="text"
              placeholder="Escribe tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Correo electrónico</label>
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              type="email"
              placeholder="Escribe tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Regístrate
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-500 hover:underline dark:text-blue-300">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 text-center p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{successMessage}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            >
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

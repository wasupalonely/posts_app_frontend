import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña.');
      } else {
        setError(data.message || 'Algo salió mal. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Recuperar Contraseña</h2>
          <p className="text-gray-600 dark:text-gray-400">Ingresa tu correo electrónico para recibir instrucciones</p>
        </div>
        {message && <p className="text-green-500 dark:text-green-400">{message}</p>}
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        <form onSubmit={handleForgotPassword}>
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
          <button
            type="submit"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Recordaste tu contraseña?{' '}
            <a href="/login" className="text-blue-500 hover:underline dark:text-blue-300">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

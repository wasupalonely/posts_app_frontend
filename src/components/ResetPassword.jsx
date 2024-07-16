import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Añadir animación o transición antes de redirigir
        setTimeout(() => {
          navigate('/login');
        }, 500); // Redirigir después de medio segundo

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
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Cambiar Contraseña</h2>
          <p className="text-gray-600 dark:text-gray-400">Ingresa tu nueva contraseña</p>
        </div>
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-bold mb-2 dark:text-gray-300">Nueva Contraseña</label>
            <input
              id="newPassword"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
              type="password"
              placeholder="Escribe tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 dark:text-gray-300">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
              type="password"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/users";

const FollowerList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUsers();
      setUsers(response);
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Followers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Link to={`/chat/${user.id}`} key={user.id} className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowerList;

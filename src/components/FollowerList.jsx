import { useEffect, useState } from "react";
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
    <>
      <h1>Followers</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
};

export default FollowerList;

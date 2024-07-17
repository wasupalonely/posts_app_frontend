import { useEffect, useState } from "react";
import { getUserById } from "../api/users";

const useUsers = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        console.log("entra en el fetchUser con userId:", userId);
        try {
          const userData = await getUserById(userId);
          console.log("🚀 ~ fetchUser ~ userData:", userData);
          setUser(userData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      console.log("userId es undefined, no se llama fetchUser");
      setLoading(false);
    }
  }, [userId]);

  return { user, loading, error, setUser };
};

export default useUsers;

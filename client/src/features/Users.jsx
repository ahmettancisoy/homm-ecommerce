import { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../app/store";

const Users = () => {
  const setUser = useStore((state) => state.setUser);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth`);

    if (response.status !== 200) return false;
    setUsers(response.data);
  };

  const changeUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    // const user = localStorage.getItem("user");
    // if (!user) getUsers();
    // if (user) setUser(JSON.parse(user));
    getUsers();
  }, []);

  return (
    <div className="max-w-md">
      <div className="text-lg font-medium pt-12 pb-4">Kullanıcı Değiştir</div>
      <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6 w-fit text-sm">
        {users.map((user) => (
          <button
            className="hover:bg-gray-100 rounded-full"
            onClick={() => changeUser(user)}
            key={user._id}
          >
            <table className="gap-8 w-full items-center text-left table table-fixed">
              <tbody>
                <tr>
                  <td>
                    <img className="w-20 rounded-full" src={user.avatarPath} />
                  </td>
                  <td>
                    <div>{user.fullName}</div>
                  </td>
                  <td>
                    <div>{user.email}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;

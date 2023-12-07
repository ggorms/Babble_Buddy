import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allUsersThunk } from "../store/user";
function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(allUsersThunk());
  }, []);
  return (
    <div>
      <h2>Welcome to the home page</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.email}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allUsersThunk } from "../store/user";
function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  const me = sessionStorage.getItem("UserInfo")
    ? JSON.parse(sessionStorage.getItem("UserInfo"))
    : "";

  console.log(me);
  useEffect(() => {
    dispatch(allUsersThunk());
  }, []);
  return (
    <div>
      <h1>{me.fName}</h1>
      <h2>Welcome to the home page</h2>
    </div>
  );
}

export default Home;

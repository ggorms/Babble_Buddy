import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import { useDispatch } from "react-redux";
import {
  followUserThunk,
  unfollowUserThunk,
  userFollowingListThunk,
} from "../store/user";

function UserSearchEntry({ user, loggedInUser, loggedInUserFollowingList }) {
  const dispatch = useDispatch();

  const followingButtonLogic = Array.isArray(loggedInUserFollowingList)
    ? // If Array
      loggedInUserFollowingList.map((u) => u.following.id).includes(user.id)
      ? "Unfollow"
      : "Follow"
    : // If Object
    loggedInUserFollowingList.followingId === user.id
    ? "Unfollow"
    : "Follow";

  const handleFollowButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const relationship = {
      userId: loggedInUser.userId,
      followingId: user.id,
    };
    if (followingButtonLogic === "Unfollow") {
      dispatch(unfollowUserThunk(relationship)).then(() => {
        dispatch(userFollowingListThunk(loggedInUser.userId));
      });
    } else if (followingButtonLogic === "Follow") {
      dispatch(followUserThunk(relationship)).then(() => {
        dispatch(userFollowingListThunk(loggedInUser.userId));
      });
    }
  };

  return (
    <Link key={user.id} to={`/profile/${user.id}`} className="userSearchLink">
      <div className="userSearchEntry">
        <div className="searchEntryContainer">
          <img src={user.avatar} className="searchEntryImage" />
          <h5 className="searchEntryName">
            {user.fName} {user.lName}
          </h5>
        </div>
        {loggedInUser.userId !== user.id && (
          <button
            className="searchEntryButton"
            onClick={(e) => handleFollowButtonClick(e)}
          >
            {followingButtonLogic}
          </button>
        )}
      </div>
    </Link>
  );
}

export default UserSearchEntry;

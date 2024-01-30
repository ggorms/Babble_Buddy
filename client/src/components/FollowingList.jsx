import Placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import {
  followUserThunk,
  unfollowUserThunk,
  userFollowingListThunk,
} from "../store/user";
import { useDispatch } from "react-redux";

function FollowingList({ user, loggedInUser, loggedInUserFollowingList }) {
  const dispatch = useDispatch();
  const followingButtonLogic = Array.isArray(loggedInUserFollowingList)
    ? // If Array
      loggedInUserFollowingList
        .map((u) => u.following.id)
        .includes(user.following.id)
      ? "Unfollow"
      : "Follow"
    : // If Object
    loggedInUserFollowingList.followingId === user.following.id
    ? "Unfollow"
    : "Follow";

  const handleFollowButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const relationship = {
      userId: loggedInUser.userId,
      followingId: user.following.id,
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
    <Link
      key={user.following?.id}
      to={`/profile/${user.following.id}`}
      className="followingLink"
    >
      <div className="followingListEntry">
        <div className="followingEntryContainer">
          <img src={Placeholder} className="followingListEntryPicture" />
          <h5 className="followingListEntryName">
            {user.following?.fName} {user.following?.lName}
          </h5>
        </div>
        {loggedInUser.userId !== user.following.id && (
          <button
            onClick={(e) => handleFollowButtonClick(e)}
            className="followingEntryButton"
          >
            {followingButtonLogic}
          </button>
        )}
      </div>
    </Link>
  );
}

export default FollowingList;

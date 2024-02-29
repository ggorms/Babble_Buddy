import Placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import {
  followUserThunk,
  unfollowUserThunk,
  userFollowingListThunk,
} from "../store/user";
import { useDispatch } from "react-redux";

function FollowersList({ user, loggedInUser, loggedInUserFollowingList }) {
  const dispatch = useDispatch();
  const followingButtonLogic = Array.isArray(loggedInUserFollowingList)
    ? // If Array
      loggedInUserFollowingList
        .map((u) => u.following.id)
        .includes(user.user.id)
      ? "Unfollow"
      : "Follow"
    : // If Object
    loggedInUserFollowingList.followingId === user.user.id
    ? "Unfollow"
    : "Follow";

  const handleFollowButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const relationship = {
      userId: loggedInUser.userId,
      followingId: user.user.id,
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
      key={user.user?.id}
      to={`/profile/${user.user.id}`}
      className="followingLink"
    >
      <div className="followingListEntry">
        <div className="followingEntryContainer">
          <img src={user.user?.avatar} className="followingListEntryPicture" />
          <h5 className="followingListEntryName">
            {user.user?.fName} {user.user?.lName}
          </h5>
        </div>
        {loggedInUser.userId !== user.user.id && (
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

export default FollowersList;

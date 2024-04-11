import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  singleUserThunk,
  userFollowingListThunk,
  unfollowUserThunk,
  followUserThunk,
} from "../../store/user";
import { useEffect } from "react";
import FollowingList from "../../components/RelationshipLists/FollowingList";
import FollowersList from "../../components/RelationshipLists/FollowersList";
import { logout } from "../../store/auth";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./Profile.css";

function Profile({ loggedInUser, loggedInUserFollowingList }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User profile information
  const userProfile = useSelector((state) => state.user.singleUser);

  // Fetch user info matching id of profile
  useEffect(() => {
    dispatch(singleUserThunk(id));
  }, [dispatch, id]);

  // If the currently logged in user follows the current user profile return "unfollow" else return "follow"
  const followingButtonLogic = Array.isArray(loggedInUserFollowingList)
    ? // If Array
      loggedInUserFollowingList
        .map((user) => user.following.id)
        .includes(userProfile.id)
      ? "Unfollow"
      : "Follow"
    : // If Object
    loggedInUserFollowingList.followingId === userProfile.id
    ? "Unfollow"
    : "Follow";

  const handleFollowButtonClick = () => {
    const relationship = {
      userId: loggedInUser.userId,
      followingId: userProfile.id,
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
    location.reload();
  };

  return (
    <div className="profile">
      <div className="profileCardWrapper">
        <img src={userProfile.avatar} className="profilePicture" />
        <div className="profileNameAndButtons">
          <h1 className="profileName">
            {userProfile.fName} {userProfile.lName}
          </h1>
          {/* If logged in User is viewing their own profile, display logout button instead of follow button */}
          {loggedInUser.userId !== userProfile.id ? (
            <div className="buttonWrapper">
              <button
                onClick={() => handleFollowButtonClick()}
                className="followingButton"
              >
                {followingButtonLogic}
              </button>
            </div>
          ) : (
            <div className="buttonWrapper">
              <button onClick={handleLogout} className="followingButton">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="followingListWrapper">
        <div className="followingList">
          <h2 className="followingTitle">
            Following{" "}
            <span id="followingCount">({userProfile.following?.length})</span>
          </h2>
          <div className="followingContainer">
            {userProfile.following?.length > 0 ? (
              userProfile.following?.map((user) => (
                <FollowingList
                  user={user}
                  key={user.following?.id}
                  loggedInUser={loggedInUser}
                  loggedInUserFollowingList={loggedInUserFollowingList}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
        <div className="followingList">
          <h2 className="followingTitle">
            Followers{" "}
            <span id="followingCount">({userProfile.followers?.length})</span>
          </h2>
          <div className="followingContainer">
            {userProfile.followers?.length > 0 ? (
              userProfile.followers?.map((user) => (
                <FollowersList
                  user={user}
                  key={user.user?.id}
                  loggedInUser={loggedInUser}
                  loggedInUserFollowingList={loggedInUserFollowingList}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

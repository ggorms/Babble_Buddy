import Placeholder from "../assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  singleUserThunk,
  userFollowingListThunk,
  unfollowUserThunk,
  followUserThunk,
} from "../store/user";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  userAndFriendConversationThunk,
  newConversationThunk,
} from "../store/conversation";
import FollowingList from "../components/FollowingList";
import FollowersList from "../components/FollowersList";
import { logoutThunk } from "../store/auth";

function Profile({ loggedInUser, loggedInUserFollowingList }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.user.singleUser);

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

  const conversation = useSelector(
    (state) => state.conversation.userAndFriendConversation
  );

  useEffect(() => {
    const members = {
      userId: loggedInUser.userId,
      friendId: userProfile.id,
    };
    dispatch(userAndFriendConversationThunk(members));
  }, [dispatch, loggedInUser.userId, userProfile.id]);

  const handleChatLinkClick = () => {
    if (conversation === null) {
      const members = {
        senderId: loggedInUser.userId,
        receiverId: userProfile.id,
      };
      dispatch(newConversationThunk(members)).then(() => {
        navigate("/messenger");
      });
    } else {
      navigate("/messenger");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk()).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="profile">
      <div className="profileCardWrapper">
        <img src={Placeholder} className="profilePicture" />
        <div>
          <h1 className="profileName">
            {userProfile.fName} {userProfile.lName}
          </h1>
          {/* If logged in User is viewing their own profile, do not display follow and chat buttons */}
          {loggedInUser.userId !== userProfile.id ? (
            <>
              <button
                onClick={() => handleFollowButtonClick()}
                className="followingButton"
              >
                {followingButtonLogic}
              </button>
              <button
                onClick={() => handleChatLinkClick()}
                className="followingButton"
              >
                Chat
              </button>
            </>
          ) : (
            <button onClick={handleLogout} className="followingButton">
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="followingList">
        <h2 className="followingTitle">
          Following {userProfile.following?.length}
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
            <h4>None</h4>
          )}
        </div>
      </div>
      <div className="followingList">
        <h2 className="followingTitle">
          Followers {userProfile.followers?.length}
        </h2>
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
          <h4>None</h4>
        )}
      </div>
    </div>
  );
}

export default Profile;
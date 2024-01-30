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

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.user.userInfo);

  const userProfile = useSelector((state) => state.user.singleUser);

  const loggedInUserFollowingList = useSelector(
    (state) => state.user.userFollowingList
  );

  useEffect(() => {
    dispatch(userFollowingListThunk(loggedInUser.userId));
  }, [dispatch, loggedInUser]);

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

  return (
    <div className="profile">
      <div className="profileCardWrapper">
        <img src={Placeholder} className="profilePicture" />
        <div>
          <h1 className="profileName">
            {userProfile.fName} {userProfile.lName}
          </h1>
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
        </div>
      </div>
      <div className="followingList">
        <h2>Following</h2>
        {userProfile.following?.map((user) => (
          <div key={user.follwoing?.id} className="followingListEntry">
            <img src={Placeholder} className="followingListEntryPicture" />
            <h5 className="followingListEntryName">
              {user.following?.fName} {user.following?.lName}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

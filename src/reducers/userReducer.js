import {SET_PROFILE} from "../actions/userAction"

const initialUserData = {
  avatar: "assets/img/avatars/avatar.jpg",
  firstName: "",
  lastName: "",
  nickName: "",
  bio: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
  email: "",
};

function user(state = initialUserData, action) {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

export default user
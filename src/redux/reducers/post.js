import { GET_POSTS } from "../action";

const inizialState = {
  posts: [],
};

const getPostsAction = (state = inizialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default getPostsAction;

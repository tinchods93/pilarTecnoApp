import {FETCH_POSTS, POST_POSTS, DEL_POSTS, UPDATE_POSTS} from '../constants';
const initialState = {
  posts: null,
};
export default (state = initialState, action) => {
  if (action.type === FETCH_POSTS) {
    return {
      ...state,
      posts: action.data,
    };
  }
  if (action.type === POST_POSTS) {
    return {
      ...state,
      posts: [
        {
          userId: 1,
          title: action.data.title,
          body: action.data.body,
          id: Math.floor(Math.random() * 10000) + 100,
        },
        ...state.posts,
      ],
    };
  }
  if (action.type === UPDATE_POSTS) {
    state.posts[action.data.index] = action.data.data;

    const update = state.posts;

    return {
      posts: update,
    };
  }
  if (action.type === DEL_POSTS) {
    const update = state.posts.filter(post => post.id !== action.data.id);
    return {
      ...state,
      post: update,
    };
  }
  return {...state};
};

import {FETCH_POSTS, POST_POSTS, DEL_POSTS, UPDATE_POSTS} from '../constants';
import {fetchPosts, postPosts, deletePost, patchPost} from '../../api';
const getPostsSuccess = data => {
  return {
    type: FETCH_POSTS,
    data,
  };
};
const createPostSuccess = data => {
  return {
    type: POST_POSTS,
    data,
  };
};
const delPostSuccess = data => {
  return {
    type: DEL_POSTS,
    data,
  };
};
const updatePostSuccess = data => {
  return {
    type: UPDATE_POSTS,
    data,
  };
};
export const getPosts = () => dispatch => {
  return fetchPosts()
    .then(([response, json]) => {
      dispatch(getPostsSuccess(json));
      return json;
    })
    .catch(error => console.log(error));
};
export const createPost = data => dispatch => {
  const {title, body} = data;
  return postPosts(data)
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(createPostSuccess({title, body}));
      }
      return json;
    })
    .catch(error => console.log(error));
};
export const delpost = data => dispatch => {
  const {id} = data;
  return deletePost({id})
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(delPostSuccess({data}));
      }
      return json;
    })
    .catch(error => console.log(error));
};
export const updatePost = data => dispatch => {
  return patchPost(data)
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(updatePostSuccess(data));
      }
      return json;
    })
    .catch(error => console.log(error));
};

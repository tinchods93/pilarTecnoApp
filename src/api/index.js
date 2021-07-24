const apiUrl = 'https://jsonplaceholder.typicode.com';
///LIST POSTS
export const fetchPosts = () => {
  return fetch(apiUrl + '/posts').then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///LIST COMMENTS'S POST
export const fetchComments = ({id}) => {
  return fetch(`${apiUrl}/posts/${id}/comments`).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///CREATE POST
export const postPosts = async ({title, body}) => {
  const posts = await fetchPosts();

  return fetch(apiUrl + '/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      id: posts.length + 1,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///EDIT POST
export const patchPost = ({data}) => {
  const {title, body, id, userId} = data;

  return fetch(`${apiUrl}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id,
      title,
      body,
      userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///DELETE POST
export const deletePost = ({id}) => {
  return fetch(`${apiUrl}/posts/${id}`, {
    method: 'DELETE',
  }).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///SHOW POST
export const showPost = ({title, body, id}) => {
  return fetch(`${apiUrl}/posts/${id}${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
      body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};

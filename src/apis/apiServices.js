import axios from "axios";
import {
  BOOKMARK_A_POST,
  DISLIKE_A_POST,
  POSTS,
  GET_ALL_USERS,
  LIKE_A_POST,
  LOGIN,
  REMOVE_BOOKMARKED_POST,
  GET_POSTS_BY_USERNAME,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  SIGNUP,
} from "./apiUrls";

export const postLogin = (username, password) =>
  axios.post(LOGIN, {
    username,
    password,
  });

export const postSignup = (userInfo) =>
  axios.post(SIGNUP, {
    ...userInfo,
  });

export const getAllPostsApi = () => axios.get(POSTS);

export const createNewPostsApi = (token, postData) =>
  axios.post(
    POSTS,
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const likePostApi = (token, postId) =>
  axios.post(
    `${LIKE_A_POST}${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const dislikePostApi = (token, postId) =>
  axios.post(
    `${DISLIKE_A_POST}${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const getAllUsersApi = () => axios.get(GET_ALL_USERS);

export const bookmarkPostApi = (token, postId) =>
  axios.post(
    `${BOOKMARK_A_POST}${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeBookmarkedPostApi = (token, postId) =>
  axios.post(
    `${REMOVE_BOOKMARKED_POST}${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const getPostsByUsernameApi = (username) =>
  axios.get(`${GET_POSTS_BY_USERNAME}${username}`);

export const followUserApi = (token, followUserId) =>
  axios.post(
    `${FOLLOW_A_USER}${followUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const unfollowUserApi = (token, unfollowUserId) =>
  axios.post(
    `${UNFOLLOW_A_USER}${unfollowUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

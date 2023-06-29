import React from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";
import {
  RiHeartFill,
  RiHeartLine,
  RiChat1Line,
  RiBookmarkFill,
  RiBookmarkLine,
} from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  dislikePost,
  likePost,
} from "../../app/features/postsSlice";
import { authSelector } from "../../app/features/authSlice";
import { getIsPostBookmarked, getIsPostLiked } from "../../utils/postsHelper";
import {
  bookmarkPost,
  removePostFromBookmarks,
  usersSelector,
} from "../../app/features/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";

import { useState } from "react";
import CustomDropdownMenu from "../common/CustomDropdownMenu";
import EditPostCard from "./EditPostCard";
import { formatTimestamp } from "../../utils/constants";

const PostCard = ({ postData, noBorder }) => {
  const dispatch = useDispatch();
  const {
    encodedToken,
    foundUser: { _id, username },
  } = useSelector(authSelector);
  const navigate = useNavigate();
  const { usersData } = useSelector(usersSelector);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const likedByUser = getIsPostLiked(postData, username);
  const bookmarkedByUser = getIsPostBookmarked(
    usersData,
    postData?._id,
    username
  );
  const dropdownMenu = [
    {
      key: "1",
      label: <span onClick={() => setIsEditPost(true)}>Edit Post</span>,
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            {
              dispatch(deletePost({ encodedToken, postId: postData._id }));
              if (noBorder) {
                setTimeout(() => {
                  navigate("/");
                }, 250);
              }
            }
          }}
        >
          Delete Post
        </span>
      ),
    },
  ];

  return (
    <div
      className={`px-5 py-4   ${
        noBorder
          ? ""
          : "border border-gray-700 shadow-light-lg hover:border-pink-500"
      }  rounded-md  transition bg-[--card-bg] text-[--primary-text]`}
    >
      <header className="flex justify-between items-center">
        <section className="flex gap-2 items-center">
          <h1 className="text-sm sm:text-lg font-semibold">
            {postData?.firstName} {postData?.lastName}
          </h1>
          <Link
            to={`/userProfile/${postData?.username}`}
            className="text-xs sm:text-sm text-gray-400"
          >
            @{postData?.username}
          </Link>
          <span className="text-xs sm:text-sm flex items-center ">
            <BsDot />
            {formatTimestamp(postData?.createdAt)}
          </span>
        </section>
        {postData?.userId === _id && (
          <div className="relative inline-block text-left z-0">
            <CustomDropdownMenu
              dropdownMenu={dropdownMenu}
              icon={
                <BsThreeDots
                  className="cursor-pointer "
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              }
            />
          </div>
        )}
      </header>
      <main className="" onClick={() => navigate(`/post/${postData._id}`)}>
        {isEditPost ? (
          <EditPostCard postData={postData} setIsEditPost={setIsEditPost} />
        ) : (
          <p>{postData?.content}</p>
        )}
        <section className="py-2 ">
          {postData?.postMedia?.length > 0 && (
            <img
              src={postData?.postMedia}
              className="rounded-xl border border-black"
              alt=""
            />
          )}
        </section>
      </main>
      <footer className="flex pt-2 items-center gap-6">
        <button
          className="flex items-center gap-1"
          onClick={() => {
            if (likedByUser) {
              dispatch(
                dislikePost({ token: encodedToken, postId: postData?._id })
              );
            } else {
              dispatch(
                likePost({ token: encodedToken, postId: postData?._id })
              );
            }
          }}
        >
          <span className="p-2 hover:bg-rose-600/10 hover:text-rose-600 rounded-full transition">
            {likedByUser ? (
              <RiHeartFill className="text-2xl text-rose-600" />
            ) : (
              <RiHeartLine className="text-2xl " />
            )}
          </span>
          <span>
            {postData?.likes?.likeCount > 0 && postData?.likes?.likeCount}
          </span>
        </button>
        <button
          className="flex items-center gap-1"
          onClick={() => navigate(`/post/${postData._id}`)}
        >
          <span className="p-2 hover:text-sky-600 hover:bg-sky-600/10 rounded-full transition">
            <RiChat1Line className="text-2xl " />
          </span>
          <span>
            {postData?.comments?.length > 0 && postData?.comments?.length}
          </span>
        </button>
        <button
          className="flex items-center"
          onClick={() => {
            if (bookmarkedByUser) {
              dispatch(
                removePostFromBookmarks({
                  token: encodedToken,
                  postId: postData._id,
                  username,
                })
              );
            } else {
              dispatch(
                bookmarkPost({
                  token: encodedToken,
                  postId: postData._id,
                  username,
                })
              );
            }
          }}
        >
          <span className="p-2 hover:bg-emerald-500/10 rounded-full transition hover:text-emerald-500">
            {bookmarkedByUser ? (
              <RiBookmarkFill className="text-2xl text-emerald-500" />
            ) : (
              <RiBookmarkLine className="text-2xl " />
            )}
          </span>
        </button>
      </footer>
    </div>
  );
};

export default PostCard;

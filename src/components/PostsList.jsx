// /src/components/PostsList.js

import React, { useEffect, useState, useRef, useCallback } from "react";
import { getUserById } from "../api/users";
import StatusMessage from "./StatusMessage";
import Post from "./Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePosts from "../hooks/usePosts";

const PostsList = ({
  posts,
  handleDeletePost,
  handleLikePost,
  handleBookmarkPost,
  loading,
  error,
  loadMorePosts,
}) => {
  const [users, setUsers] = useState({});
  const observer = useRef();

  const { handleAddComment, hasMore } = usePosts();
  const dummyImage = "https://via.placeholder.com/150";
  const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = {};
      for (const post of posts) {
        if (!users[post.authorId] && !usersData[post.authorId]) {
          try {
            const response = await getUserById(post.authorId);
            usersData[post.authorId] = response;
          } catch (error) {
            console.error(
              `Error fetching user data for authorId ${post.authorId}:`,
              error
            );
            usersData[post.authorId] = {
              username: "Unknown",
              profilePicture: dummyImage,
            };
          }
        }
      }
      setUsers((prevUsers) => ({ ...prevUsers, ...usersData }));
    };

    fetchUsers();
  }, [posts]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts]
  );

  return (
    <>
      {error ? (
        <div>
          <StatusMessage type={"error"} message={error} />
        </div>
      ) : (
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post._id}>
                <Post
                  post={post}
                  user={users[post.authorId]}
                  id={id}
                  handleLikePost={handleLikePost}
                  handleBookmarkPost={handleBookmarkPost}
                  handleDeletePost={handleDeletePost}
                  handleAddComment={handleAddComment}
                />
              </div>
            );
          } else {
            return (
              <Post
                key={post._id}
                post={post}
                user={users[post.authorId]}
                id={id}
                handleLikePost={handleLikePost}
                handleBookmarkPost={handleBookmarkPost}
                handleDeletePost={handleDeletePost}
                handleAddComment={handleAddComment}
              />
            );
          }
        })
      )}
      {loading && (
        <div>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
              >
                <Skeleton
                  height={40}
                  width={40}
                  circle={true}
                  baseColor="#333"
                  highlightColor="#444"
                />
                <Skeleton
                  height={20}
                  width={`60%`}
                  baseColor="#333"
                  highlightColor="#444"
                />
                <Skeleton
                  height={20}
                  width={`80%`}
                  baseColor="#333"
                  highlightColor="#444"
                />
                <Skeleton height={200} baseColor="#333" highlightColor="#444" />
              </div>
            ))}
        </div>
      )}
      {
        posts.length === 0 && (
          <div>
            <StatusMessage type={"empty"} message={"No posts found"} />
          </div>
        )
      }
    </>
  );
};

export default PostsList;

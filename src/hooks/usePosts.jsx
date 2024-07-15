import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/posts", config);
      setPosts(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/posts/${id}/bookmarks`, config);
      setBookmarks(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, config);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/posts/${postId}/like`, { userId: id }, config);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(id)
                  ? post.likes.filter((likeId) => likeId !== id)
                  : [...post.likes, id],
              }
            : post
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const handleBookmarkPost = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/users/${id}/bookmark`, { postId }, config);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                bookmarks: post.bookmarks.includes(id)
                  ? post.bookmarks.filter((bm) => bm !== id)
                  : [...post.bookmarks, id],
              }
            : post
        )
      );
      fetchBookmarks();
    } catch (err) {
      setError(err);
    }
  };

  const handlePostCreated = (post) => {
    setPosts((prevPosts) => [post.data, ...prevPosts]);
  };

  useEffect(() => {
    fetchPosts();
    fetchBookmarks();
  }, [fetchPosts, fetchBookmarks]);

  return {
    posts,
    bookmarks,
    loading,
    error,
    handleDeletePost,
    handleLikePost,
    handleBookmarkPost,
    handlePostCreated,
    fetchPosts,
    fetchBookmarks,
  };
};

export default usePosts;

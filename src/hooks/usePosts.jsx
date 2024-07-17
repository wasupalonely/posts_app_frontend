import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getUserById } from "../api/users";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsStatus, setPostsStatus] = useState("loading");
  const me = JSON.parse(localStorage.getItem("user"))
  const id = JSON.parse(localStorage.getItem("user"))._id;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchPosts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/posts?page=${page}&limit=10`,
          config
        );
        setPosts((prevPosts) => {
          if (page === 1) return res.data;
          return [...prevPosts, ...res.data];
        });
        setHasMore(res.data.length > 0); // Si no hay más datos, hasMore será false
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMorePosts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [fetchPosts, page]);

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/posts/${id}/bookmarks`,
        config
      );
      setBookmarks(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/posts/${postId}`,
        config
      );
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const ṕost = posts.find((post) => post._id === postId);
      const author = await getUserById(ṕost.authorId);
      await axios.post(
        `http://localhost:3000/api/v1/posts/${postId}/like`,
        { userId: id },
        config
      );
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

      const notification = {
        title: `A ${me.username} le ha gustado tu post!`,
        content: `${author.username}, tienes un nuevo like en tu post!`,
        type: "like",
        from: id,
        to: ṕost.authorId,
        metadata: {
          postId,
        }
      }

      await axios.post(
        "http://localhost:3000/api/v1/notifications",
        notification,
        config
      );

    } catch (err) {
      setError(err);
    }
  };

  const handleBookmarkPost = async (postId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/users/${id}/bookmark`,
        { postId },
        config
      );
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

  const handleAddComment = async (postId, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments`,
        {
          postId,
          content: comment,
          authorId: id,
        },
        config
      );
      const updatedPost = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );

      return updatedPost;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const handlePostCreated = (post) => {
    setPosts((prevPosts) => [post.data, ...prevPosts]);
  };

  const createPost = async (content, image) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("authorId", id);

    if (image) {
      formData.append("images", image);
    }

    try {
      const post = await axios.post(
        "http://localhost:3000/api/v1/posts",
        formData,
        config
      );
      handlePostCreated(post);
      return post;
    } catch (err) {
      setError(err);
      throw err;
    }
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
    hasMore,
    handleDeletePost,
    handleLikePost,
    handleBookmarkPost,
    handleAddComment,
    handlePostCreated,
    fetchBookmarks,
    fetchPosts,
    loadMorePosts,
    createPost,
  };
};

export default usePosts;

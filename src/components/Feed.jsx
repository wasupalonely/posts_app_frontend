// /src/components/Feed.js

import { useEffect } from "react";
import Header from "./Header";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import usePosts from "../hooks/usePosts";

const Feed = () => {
  const {
    posts,
    handleDeletePost,
    handleLikePost,
    handleBookmarkPost,
    handlePostCreated,
    loading,
    error,
    fetchPosts,
    loadMorePosts,
  } = usePosts("post");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="p-4">
            <CreatePost onPostCreated={handlePostCreated} />
            <PostsList
              posts={posts}
              loading={loading}
              error={error}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikePost}
              handleBookmarkPost={handleBookmarkPost}
              loadMorePosts={loadMorePosts}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feed;

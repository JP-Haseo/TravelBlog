
import React from 'react';
import type { Post } from '../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onSelectPost: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-slate-700">No stories yet.</h2>
        <p className="text-slate-500 mt-2">Why not be the first to share an adventure?</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
      ))}
    </div>
  );
};

export default PostList;

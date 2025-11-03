
import React from 'react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onSelectPost: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelectPost }) => {
  const snippet = post.content.substring(0, 120) + (post.content.length > 120 ? '...' : '');

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onSelectPost(post.id)}
    >
      <div className="w-full h-48 bg-slate-200 overflow-hidden">
        <img 
          src={post.imageUrl || `https://picsum.photos/seed/${post.id}/600/400`} 
          alt={post.title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-800">{post.title}</h3>
        <p className="text-sm text-slate-500 mt-1">
          By <span className="font-medium">{post.author}</span> on {new Date(post.timestamp).toLocaleDateString()}
        </p>
        <p className="text-slate-600 mt-4 flex-grow">{snippet}</p>
        <div className="mt-4 text-sm font-semibold text-cyan-600 hover:text-cyan-700">
          Read More &rarr;
        </div>
      </div>
    </div>
  );
};

export default PostCard;

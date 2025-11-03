
import React from 'react';
import type { Post } from '../types';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import BackIcon from './icons/BackIcon';

interface PostDetailProps {
  post: Post;
  onAddComment: (postId: string, author: string, content: string) => void;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onAddComment, onBack }) => {
  return (
    <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
         <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/70 hover:bg-white text-slate-800 rounded-full p-2 transition-colors z-10"
        >
          <BackIcon className="w-6 h-6" />
        </button>
        <div className="w-full h-64 md:h-80 bg-slate-200">
            <img 
              src={post.imageUrl || `https://picsum.photos/seed/${post.id}/1200/800`} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
        </div>
      </div>
      <div className="p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
        <p className="text-sm text-slate-500 mt-2">
          By <span className="font-medium">{post.author}</span> &bull; Published on {new Date(post.timestamp).toLocaleDateString()}
        </p>
        <article className="prose prose-lg max-w-none mt-8 text-slate-700 whitespace-pre-wrap">
          {post.content}
        </article>
        
        <hr className="my-10 border-slate-200" />

        <section>
          <h2 className="text-2xl font-bold mb-6">
            {post.comments.length} {post.comments.length === 1 ? 'Response' : 'Responses'}
          </h2>
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map(comment => <Comment key={comment.id} comment={comment} />)
            ) : (
              <p className="text-slate-500">Be the first to leave a response!</p>
            )}
          </div>
          <AddCommentForm onAddComment={(author, content) => onAddComment(post.id, author, content)} />
        </section>
      </div>
    </div>
  );
};

export default PostDetail;

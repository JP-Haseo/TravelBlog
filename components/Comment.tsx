
import React from 'react';
import type { Comment as CommentType } from '../types';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg">
      <p className="text-slate-700 whitespace-pre-wrap">{comment.content}</p>
      <div className="mt-3 text-xs text-slate-500">
        <span className="font-semibold">{comment.author}</span> &bull;{' '}
        {new Date(comment.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default Comment;

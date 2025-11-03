
import React, { useState } from 'react';

interface AddCommentFormProps {
  onAddComment: (author: string, content: string) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ onAddComment }) => {
  const [author, setAuthor] = useState('Anonymous');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    onAddComment(author.trim() || 'Anonymous', content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-slate-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Leave a Response</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="comment-author" className="block text-sm font-medium text-slate-700">Your Name</label>
          <input
            id="comment-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="comment-content" className="block text-sm font-medium text-slate-700">Your Response</label>
          <textarea
            id="comment-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Share your thoughts..."
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700">
            Post Response
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCommentForm;

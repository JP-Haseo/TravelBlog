
import React, { useState, useCallback } from 'react';
import { generatePostImage, enhancePostContent, getPostIdeas } from '../services/geminiService';
import type { Post } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import GenerateIcon from './icons/GenerateIcon';

interface CreatePostFormProps {
  onClose: () => void;
  onCreatePost: (post: Omit<Post, 'id' | 'comments' | 'timestamp'>) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose, onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Anonymous');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGettingIdeas, setIsGettingIdeas] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);

  const handleGenerateImage = useCallback(async () => {
    if (!title) {
      alert('Please enter a title first to generate a relevant image.');
      return;
    }
    setIsGeneratingImage(true);
    try {
      const generatedUrl = await generatePostImage(title);
      setImageUrl(generatedUrl);
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  }, [title]);

  const handleEnhanceContent = useCallback(async (type: "proofread" | "make more exciting") => {
    if (!content) {
      alert('Please write some content first to enhance it.');
      return;
    }
    setIsEnhancing(true);
    try {
      const enhancedText = await enhancePostContent(content, type);
      setContent(enhancedText);
    } catch (error) {
      console.error(error);
      alert('Failed to enhance content. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  }, [content]);

  const handleGetIdeas = useCallback(async () => {
      setIsGettingIdeas(true);
      try {
        const postIdeas = await getPostIdeas();
        setIdeas(postIdeas);
      } catch (error) {
        console.error(error);
        alert('Failed to get post ideas.');
      } finally {
        setIsGettingIdeas(false);
      }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }
    onCreatePost({ title, author, content, imageUrl });
  };

  const isSubmitting = isGeneratingImage || isEnhancing;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Share Your Journey</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
            <div className="flex gap-2 mt-1">
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., A Magical Sunrise in Cappadocia"
                  className="flex-grow block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                />
                 <button type="button" onClick={handleGetIdeas} disabled={isGettingIdeas} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 disabled:opacity-50 text-sm flex items-center gap-1.5">
                    {isGettingIdeas ? '...' : 'Ideas'}
                 </button>
            </div>
          </div>
           {ideas.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="font-semibold text-sm mb-2 text-slate-600">Need some inspiration?</h4>
                    <div className="flex flex-wrap gap-2">
                        {ideas.map((idea, index) => (
                            <button key={index} type="button" onClick={() => { setTitle(idea); setIdeas([]); }} className="text-xs bg-white border border-slate-300 rounded-full px-3 py-1 hover:bg-cyan-50 hover:border-cyan-300">
                                {idea}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-slate-700">Author</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="content" className="block text-sm font-medium text-slate-700">Your Story</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Share the details of your adventure..."
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div className="w-full sm:w-48 flex-shrink-0 space-y-3">
              <label className="block text-sm font-medium text-slate-700">Cover Image</label>
              <div className="aspect-square w-full bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt="Generated cover" className="w-full h-full object-cover" />
                ) : (
                    <GenerateIcon className="h-12 w-12 text-slate-400"/>
                )}
              </div>
              <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage || !title} className="w-full text-sm flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-300">
                {isGeneratingImage ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon className="w-4 h-4"/>}
                {isGeneratingImage ? "Generating..." : "Generate with AI"}
              </button>
            </div>
          </div>
          <div>
             <div className="flex items-center gap-2 mt-2">
                 <span className="text-sm font-medium text-slate-700">Enhance with AI:</span>
                <button type="button" onClick={() => handleEnhanceContent('proofread')} disabled={isEnhancing || !content} className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 disabled:opacity-50">Proofread</button>
                <button type="button" onClick={() => handleEnhanceContent('make more exciting')} disabled={isEnhancing || !content} className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 disabled:opacity-50">Make More Exciting</button>
                {isEnhancing && <div className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>}
            </div>
          </div>
        </form>
        <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Cancel</button>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-md shadow-sm hover:bg-slate-900 disabled:bg-slate-400">Publish Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;

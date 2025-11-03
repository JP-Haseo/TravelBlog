
import React, { useState, useMemo } from 'react';
import type { Post, Comment } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePostForm from './components/CreatePostForm';

const App: React.FC = () => {
  const [posts, setPosts] = useLocalStorage<Post[]>('travel-posts', []);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = (newPostData: Omit<Post, 'id' | 'comments' | 'timestamp'>) => {
    const newPost: Post = {
      ...newPostData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setIsCreatingPost(false);
  };

  const handleAddComment = (postId: string, author: string, content: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      author,
      content,
      timestamp: new Date().toISOString(),
    };
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const handleSelectPost = (id: string) => {
    setSelectedPostId(id);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
  };
  
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [posts]);

  const selectedPost = useMemo(() => {
    return posts.find(p => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {selectedPost ? (
          <PostDetail post={selectedPost} onAddComment={handleAddComment} onBack={handleBackToList} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-slate-800">Travel Stories</h2>
              <button
                onClick={() => setIsCreatingPost(true)}
                className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-900 transition-colors"
              >
                Create New Post
              </button>
            </div>
            <div className="bg-cyan-50 border-l-4 border-cyan-500 text-cyan-800 p-4 rounded-r-lg mb-6 text-sm">
                <strong>Welcome!</strong> All posts and comments are stored anonymously and locally in your browser's storage. They won't be visible on other devices or to other people.
            </div>
            <PostList posts={sortedPosts} onSelectPost={handleSelectPost} />
          </>
        )}
      </main>
      {isCreatingPost && (
        <CreatePostForm
          onClose={() => setIsCreatingPost(false)}
          onCreatePost={handleCreatePost}
        />
      )}
    </div>
  );
};

export default App;

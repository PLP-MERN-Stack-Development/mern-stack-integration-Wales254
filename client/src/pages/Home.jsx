import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import '../styles/Posts.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    loadPosts();
  }, [currentPage, category]);

  const loadPosts = async () => {
    try {
      const params = { page: currentPage, limit: 10 };
      if (category) params.category = category;
      if (search) params.search = search;

      const response = await postsAPI.getAllPosts(params);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadPosts();
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to MERN Blog</h1>
        <p>Discover amazing stories and insights</p>
      </div>

      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <select 
          value={category} 
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="category-filter"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Fashion">Fashion</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p className="no-posts">No posts found. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <article key={post._id} className="post-card">
              {post.featuredImage && (
                <Link to={`/posts/${post._id}`}>
                  <img 
                    src={`${API_BASE}${post.featuredImage}`}
                    alt={post.title}
                    className="post-card-image"
                  />
                </Link>
              )}
              
              <div className="post-card-content">
                <div className="post-card-meta">
                  <span className="post-card-category">{post.category}</span>
                  <span className="post-card-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link to={`/posts/${post._id}`}>
                  <h2 className="post-card-title">{post.title}</h2>
                </Link>

                <p className="post-card-excerpt">
                  {post.content.substring(0, 150)}...
                </p>

                <div className="post-card-footer">
                  <div className="post-card-author">
                    <img 
                      src={post.author.profileImage} 
                      alt={post.author.username}
                      className="post-card-avatar"
                    />
                    <span>{post.author.username}</span>
                  </div>

                  <div className="post-card-stats">
                    <span>❤️ {post.likes.length}</span>
                    <span>💬 {post.comments.length}</span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span>Page {currentPage} of {totalPages}</span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
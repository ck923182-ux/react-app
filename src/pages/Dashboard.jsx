import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const API_URL = 'react-app-production-94f9.up.railway.app';

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `http://localhost:5002${imagePath}`;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ posts: 0, users: 0, categories: 0 });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes] = await Promise.all([
          fetch(`${API_URL}/posts`),
        ]);

        const posts = await postsRes.json();

        // For non-admins, filter to only their own posts
        let userPosts = posts;
        if (user.role !== 'admin') {
          userPosts = posts.filter(p => String(p.author) === String(user._id));
        }

        setStats({
          posts: Array.isArray(userPosts) ? userPosts.length : 0,
          users: user.role === 'admin' ? 0 : 0,
          categories: 0,
        });

        if (Array.isArray(userPosts)) {
          setRecentPosts(userPosts.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const canEdit = (post) => {
    return user.role === 'admin' || String(post.author) === String(user._id);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon posts-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.posts}</h3>
            <p>Blog Posts</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/blogs/new" className="action-btn primary">
              + New Blog
            </Link>
            <Link to="/blogs" className="action-btn tertiary">
              View All Blogs
            </Link>
            {user.role === 'admin' && (
              <>
                <Link to="/users/new" className="action-btn secondary">
                  + New User
                </Link>
                <Link to="/users" className="action-btn quaternary">
                  View All Users
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Posts</h2>
            <Link to="/blogs" className="view-all">View All →</Link>
          </div>
          <div className="posts-list">
            {recentPosts.map((post) => (
              <div key={post._id} className="post-item">
                <div className="post-info">
                  <h4>{post.title}</h4>
                  <p>By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="post-actions">
                  <Link to={`/post/${post._id}`} className="view-link">View</Link>
                  {canEdit(post) && (
                    <Link to={`/blogs/edit/${post._id}`} className="edit-link">Edit</Link>
                  )}
                </div>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <p className="no-posts">No posts yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

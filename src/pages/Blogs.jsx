import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Blogs.css";

const API_URL = "http://localhost:5002/api";

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `http://localhost:5002${imagePath}`;
};

function Blogs() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const fetchPosts = () => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const canEdit = (post) => {
    if (!user) return false;
    return user.role === "admin" || String(user._id) === String(post.author);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="blogs-page">
      <style>{`
        .blogs-page {
          min-height: 100vh;
          padding: 36px 20px;
          background: #f7f7fb;
        }

        .blogs-panel {
          max-width: 1080px;
          margin: 0 auto;
        }

        .blogs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .blogs-title {
          margin: 0;
          color: #122033;
          font-size: 2rem;
        }

        .new-button {
          border: none;
          border-radius: 999px;
          background: #5b5bd6;
          color: #fff;
          padding: 12px 18px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
        }

        .blog-list {
          display: grid;
          gap: 18px;
        }

        .blog-card {
          background: #fff;
          border-radius: 22px;
          box-shadow: 0 18px 40px rgba(17, 24, 39, 0.08);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr;
        }

        .blog-card img {
          width: 100%;
          height: 260px;
          object-fit: cover;
        }

        .blog-card-body {
          padding: 24px;
        }

        .blog-card-body h3 {
          margin: 0 0 10px;
          color: #122033;
        }

        .blog-card-body p {
          color: #5d6b85;
          margin: 0 0 18px;
        }

        .blog-card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-link {
          border: none;
          background: none;
          color: #5b5bd6;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
        }
        
        .btn-delete {
          color: #ef4444;
        }

        @media (min-width: 768px) {
          .blog-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="blogs-panel">
        <div className="blogs-header">
          <div>
            <h1 className="blogs-title">All Blogs</h1>
            <p>View and manage your posts on dedicated create and edit pages.</p>
          </div>
          {user && (
            <Link to="/blogs/new" className="new-button">
              + New Blog
            </Link>
          )}
        </div>

        <div className="blog-list">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <article className="blog-card" key={post._id}>
                    {post.image && <img src={getImageUrl(post.image)} alt={post.title} />}
                    <div className="blog-card-body">
                      <h3>{post.title}</h3>
                      <p>{post.content?.substring(0, 140)}...</p>
                      <div className="blog-card-actions">
                        <span>By {post.authorName || post.author}</span>
                        <div>
                          <Link to={`/post/${post._id}`} className="btn-link">
                            View
                          </Link>
                          {canEdit(post) && (
                            <>
                              <Link to={`/blogs/edit/${post._id}`} className="btn-link" style={{marginLeft: '12px'}}>
                                Edit
                              </Link>
                              <button onClick={() => handleDelete(post._id)} className="btn-link btn-delete" style={{marginLeft: '12px'}}>
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p>Loading posts...</p>
              )}
            </div>
      </div>
    </div>
  );
}

export default Blogs;

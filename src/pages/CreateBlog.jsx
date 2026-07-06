import React from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/Blogs/CreatePost";

function CreateBlog() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <style>{`
        .page-shell {
          min-height: 100vh;
          padding: 36px 20px;
          background: #f7f7fb;
        }

        .page-card {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          border-radius: 26px;
          box-shadow: 0 24px 60px rgba(17, 24, 39, 0.08);
          padding: 32px;
        }

        .page-card h1 {
          margin: 0 0 14px;
          font-size: 2rem;
          color: #122033;
        }

        .page-card p {
          margin: 0 0 24px;
          color: #5d6b85;
          line-height: 1.7;
        }
      `}</style>

      <div className="page-card">
        <h1>Create New Blog</h1>
        <p>Use the form below to add a new blog post.</p>
        <CreatePost onPostCreated={() => navigate("/blogs")} />
      </div>
    </div>
  );
}

export default CreateBlog;

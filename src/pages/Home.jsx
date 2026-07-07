import React, { useState, useEffect } from "react";

const API_URL = "react-app-production-94f9.up.railway.app";

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `http://localhost:5002${imagePath}`;
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [totalpost, setTotoalpost] = useState([]);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [cat, setCat] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to fetch posts");
      }

      setPosts(result);
      setTotoalpost(result);

      const featured = result.filter((post) => post.Featured === true);
      setFeaturedPosts(featured.length ? featured.slice(0, 3) : result.slice(0, 3));

      const uniqueAuthors = new Set(
        result.map((post) => post.authorName || post.author).filter((author) => author && author.trim() !== "")
      );

      setTotalAuthors(uniqueAuthors.size);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCat(data))
      .catch(() => setCat([]));
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <>
      <style>{`
        .home-page {
          background: #f7f7fb;
        }

        .hero-section {
          background:
            radial-gradient(circle at top, rgba(99, 102, 241, 0.1), transparent 30%),
            linear-gradient(90deg, #f8f7ff 0%, #eef7ff 100%);
          padding: 90px 0;
        }

        .hero-row {
          align-items: center;
        }

        .hero-text h5 {
          color: #5b5bd6;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .hero-text h1 {
          font-size: 3.2rem;
          line-height: 1;
          margin: 0;
          color: #122033;
        }

        .hero-text p {
          color: #5d6b85;
          font-size: 1rem;
          margin: 18px 0;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 12px 22px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-primary {
          background: #5b5bd6;
          color: #fff;
        }

        .btn-secondary {
          background: #eef2ff;
          color: #3f46b5;
        }

        .stats-row {
          display: flex;
          gap: 24px;
          margin-top: 30px;
        }

        .stat-box {
          background: #fff;
          padding: 14px 18px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(18, 32, 51, 0.06);
        }

        .stat-box strong {
          display: block;
          font-size: 1.3rem;
          color: #122033;
        }

        .stat-box span {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .hero-visual {
          position: relative;
        }

        .hero-card {
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(17, 24, 39, 0.12);
        }

        .hero-card img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
        }

        .floating-note {
          position: absolute;
          left: -25px;
          bottom: 30px;
          background: #122033;
          color: #fff;
          padding: 18px 20px;
          border-radius: 18px;
          min-width: 220px;
        }

        .floating-note small {
          display: block;
          color: #9ca3af;
          margin-bottom: 6px;
        }

        .section {
          padding: 70px 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .section-header h2 {
          margin: 0;
          color: #122033;
        }

        .section-header a {
          color: #5b5bd6;
          text-decoration: none;
          font-weight: 600;
        }

        .featured-grid,
        .post-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .featured-card,
        .post-card,
        .category-card,
        .panel-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(18, 32, 51, 0.06);
        }

        .featured-card {
          padding: 22px;
        }

        .featured-card span {
          color: #5b5bd6;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .featured-card h3,
        .post-card h3 {
          color: #122033;
          margin: 10px 0;
        }

        .featured-card p,
        .post-card p {
          color: #5d6b85;
        }

        .categories-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .category-card {
          padding: 18px 22px;
          color: #122033;
          font-weight: 600;
          text-align: center;
        }

        .post-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .post-card .post-body {
          padding: 18px;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          color: #6b7280;
          font-size: 0.9rem;
          gap: 10px;
          flex-wrap: wrap;
        }

        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .text-btn {
          border: none;
          background: transparent;
          color: #5b5bd6;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          margin-top: 32px;
          align-items: start;
        }

        .panel-card {
          padding: 24px;
          background: #fff;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .panel-header h3 {
          margin: 4px 0 0;
          color: #122033;
        }

        .eyebrow {
          margin: 0;
          color: #5b5bd6;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .ghost-btn {
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #374151;
          border-radius: 999px;
          padding: 8px 12px;
          cursor: pointer;
        }

        .info-card {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
        }

        .info-card p {
          color: #5d6b85;
          margin: 0;
        }

        @media (max-width: 992px) {
          .hero-text h1 {
            font-size: 2.8rem;
          }

          .featured-grid,
          .post-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 0;
          }

          .hero-actions {
            flex-direction: column;
          }

          .stats-row {
            flex-direction: column;
          }

          .featured-grid,
          .post-grid,
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .hero-card img {
            height: 360px;
          }

          .floating-note {
            position: static;
            margin-top: 16px;
          }

          .panel-card {
            padding: 18px;
          }
        }
      `}</style>

      <div className="home-page">
        <section className="hero-section">
          <div className="container">
            <div className="row hero-row">
              <div className="col-12 col-lg-6 hero-text">
                <h5>Welcome to BlogApp</h5>
                <h1>Discover ideas that spark your next big move</h1>
                <p>
                  Read inspiring stories, practical insights, and thoughtful ideas
                  from creators and thinkers around the world.
                </p>
                <div className="hero-actions">
                  <button className="btn btn-primary">Start Reading</button>
                  <button className="btn btn-secondary">Explore Topics</button>
                </div>
                <div className="stats-row">
                  <div className="stat-box">
                    <strong>{totalpost.length}+</strong>
                    <span>Blogs</span>
                  </div>
                  <div className="stat-box">
                    <strong>{totalAuthors}+</strong>
                    <span>Authors</span>
                  </div>
                  <div className="stat-box">
                    <strong>{cat.length}+</strong>
                    <span>Categories</span>
                  </div>
                </div>

                <div className="dashboard-grid">
                  <div className="panel-card info-card">
                    <p className="eyebrow">Quick actions</p>
                    <h3>Manage posts from one place</h3>
                    <p>Use the Blog page to create new posts and edit existing posts on their own pages.</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 hero-visual">
                <div className="hero-card">
                  <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
                    alt="Blog banner"
                  />
                </div>
                <div className="floating-note">
                  <small>Trending now</small>
                  <strong>How to stay focused in a noisy world</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Featured Articles</h2>
              <a href="#">View all</a>
            </div>

            <div className="featured-grid">
              {featuredPosts.map((feature) => (
                <div className="featured-card" key={feature._id}>
                  <span>{feature.category}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Popular Categories</h2>
            </div>

            <div className="categories-row">
              {cat.length > 0 ? (
                cat.map((cate) => (
                  <div key={cate._id} className="category-card">{cate.name}</div>
                ))
              ) : (
                <p>Loading posts...</p>
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Recent Posts</h2>
              <a href="#">See more</a>
            </div>

            <div className="post-grid">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <article className="post-card" key={post._id}>
                    {post.image && (
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                      />
                    )}
                    <div className="post-body">
                      <div className="post-meta">
                        <span>{post.authorName || post.author}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <div className="post-actions">
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p>Loading posts...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
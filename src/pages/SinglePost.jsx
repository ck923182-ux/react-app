import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = "react-app-production-94f9.up.railway.app";

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `http://localhost:5002${imagePath}`;
};

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch the blog post.');
                }

                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch the blog post.');
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) return <div className="status">Loading post...</div>;
    if (error) return <div className="status error">{error}</div>;

    return (
        <article style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
            <Link to="/" style={{ color: '#5b5bd6', fontWeight: '700', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                ← Back to Home
            </Link>
            <header style={{ marginTop: '20px', marginBottom: '30px' }}>
                <h1 style={{ color: '#122033', fontSize: '2.5rem', marginBottom: '16px' }}>{post?.title}</h1>
                <p style={{ color: '#666', fontStyle: 'italic', fontSize: '1.1rem' }}>
                    By {post?.authorName || post?.author} on{' '}
                    {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                </p>
            </header>
            {post?.image && (
                <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    style={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '16px',
                        marginBottom: '30px'
                    }}
                />
            )}
            <hr style={{ border: '1px solid #e5e7eb', marginBottom: '30px' }} />
            <section style={{ lineHeight: '1.8', fontSize: '18px', marginTop: '20px', color: '#374151' }}>
                <p>{post?.content}</p>
            </section>
        </article>
    );
};

export default SinglePost;

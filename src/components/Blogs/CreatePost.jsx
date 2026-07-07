import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "react-app-production-94f9.up.railway.app";

function CreatePost({ onPostCreated }) {
    const { user } = useAuth();

    const initialState = {
        title: "",
        content: "",
        category: "",
        published: true,
    };

    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        try {
            const postData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                postData.append(key, value);
            });

            if (image) {
                postData.append("image", image);
            }

            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
                body: postData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to create post");
            }

            setStatus({ type: "success", message: "Post published successfully." });
            setFormData(initialState);
            setImage(null);

            if (onPostCreated) {
                onPostCreated(data.data);
            }
        } catch (error) {
            setStatus({ type: "error", message: error.message });
        }
    };

    return (
        <div className="create-post-card">
            <style>{`
                .create-post-card {
                    background: #fff;
                    border-radius: 24px;
                    padding: 24px;
                    box-shadow: 0 16px 40px rgba(17, 24, 39, 0.08);
                }

                .create-post-card h3 {
                    margin: 0;
                    color: #122033;
                }

                .create-post-card p {
                    margin: 6px 0 0;
                    color: #6b7280;
                }

                .create-post-form {
                    margin-top: 16px;
                    display: grid;
                    gap: 12px;
                }

                .create-post-form label {
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: #374151;
                }

                .create-post-form input,
                .create-post-form textarea {
                    width: 100%;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 10px 12px;
                    font-size: 0.95rem;
                    box-sizing: border-box;
                }

                .create-post-form textarea {
                    min-height: 110px;
                    resize: vertical;
                }

                .checkbox-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #374151;
                    font-size: 0.92rem;
                }

                .submit-btn {
                    border: none;
                    border-radius: 999px;
                    background: linear-gradient(90deg, #5b5bd6, #4f46e5);
                    color: white;
                    padding: 12px 16px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .status-message {
                    border-radius: 12px;
                    padding: 10px 12px;
                    font-size: 0.92rem;
                }

                .status-message.success {
                    background: #ecfdf3;
                    color: #047857;
                }

                .status-message.error {
                    background: #fef2f2;
                    color: #b91c1c;
                }

                @media (max-width: 768px) {
                    .create-post-card {
                        padding: 18px;
                    }
                }
            `}</style>

            <h3>Create a new post</h3>
            <p>Share your thoughts with a polished post form.</p>

            {status.message ? (
                <div className={`status-message ${status.type}`}>{status.message}</div>
            ) : null}

            <form className="create-post-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    required
                />

                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write something inspiring..."
                    required
                />

                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />

                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label className="checkbox-row">
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />
                    Publish immediately
                </label>

                <button className="submit-btn" type="submit">
                    Publish Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;

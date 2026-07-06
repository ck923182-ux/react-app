import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5002/api";

function EditPost({ post, postId, onUpdated }) {
    const { user } = useAuth();

    const initialState = {
        title: "",
        content: "",
        category: "",
        published: true,
    };

    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(Boolean(postId) || Boolean(post));
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const populateForm = (data) => {
            setFormData({
                title: data.title || "",
                content: data.content || "",
                category: data.category || "",
                published: data.published ?? true,
            });

            if (data.image) {
                setPreviewUrl(`http://localhost:5002${data.image}`);
            } else {
                setPreviewUrl("");
            }
        };

        if (post) {
            populateForm(post);
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/posts/${postId}`);
                if (!response.ok) throw new Error("Failed to fetch post data.");

                const data = await response.json();
                populateForm(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        } else {
            setLoading(false);
        }
    }, [post, postId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const targetId = post?._id || postId;
        if (!targetId) {
            setError("Post id is missing.");
            return;
        }

        try {
            const editData = new FormData();
            editData.append("title", formData.title);
            editData.append("content", formData.content);
            editData.append("category", formData.category);
            editData.append("published", formData.published);

            if (image) {
                editData.append("image", image);
            }

            const response = await fetch(`${API_URL}/posts/${targetId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
                body: editData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update post.");
            }

            setSuccessMessage("Post updated successfully!");
            if (onUpdated) {
                onUpdated(result.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="edit-loading">Loading post details...</div>;

    return (
        <div className="edit-post-card">
            <style>{`
                .edit-post-card {
                    display: grid;
                    gap: 12px;
                }

                .edit-post-card h3 {
                    margin: 0;
                    color: #122033;
                }

                .edit-post-card form {
                    display: grid;
                    gap: 10px;
                }

                .edit-post-card label {
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: #374151;
                }

                .edit-post-card input,
                .edit-post-card textarea {
                    width: 100%;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 10px 12px;
                    font-size: 0.95rem;
                    box-sizing: border-box;
                }

                .edit-post-card textarea {
                    min-height: 110px;
                    resize: vertical;
                }

                .preview-image {
                    width: 100%;
                    max-width: 220px;
                    border-radius: 14px;
                    object-fit: cover;
                }

                .edit-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .primary-btn,
                .secondary-btn {
                    border: none;
                    border-radius: 999px;
                    padding: 10px 14px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .primary-btn {
                    background: #5b5bd6;
                    color: #fff;
                }

                .secondary-btn {
                    background: #eef2ff;
                    color: #3f46b5;
                }

                .message.success {
                    color: #047857;
                    background: #ecfdf3;
                    padding: 10px 12px;
                    border-radius: 12px;
                }

                .message.error {
                    color: #b91c1c;
                    background: #fef2f2;
                    padding: 10px 12px;
                    border-radius: 12px;
                }

                @media (max-width: 768px) {
                    .edit-actions {
                        flex-direction: column;
                    }
                }
            `}</style>

            <h3>Edit post</h3>
            {error ? <div className="message error">{error}</div> : null}
            {successMessage ? <div className="message success">{successMessage}</div> : null}

            <form onSubmit={handleEditSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows="6"
                />

                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <label>Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {previewUrl ? <img className="preview-image" src={previewUrl} alt="Preview" /> : null}

                <label>
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />
                    Publish immediately
                </label>

                <div className="edit-actions">
                    <button className="primary-btn" type="submit">Save Changes</button>
                    <button className="secondary-btn" type="button" onClick={() => onUpdated?.(null)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;

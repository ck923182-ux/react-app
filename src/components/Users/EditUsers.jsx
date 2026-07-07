import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "react-app-production-94f9.up.railway.app";

function Editusers({ userID, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unable to load user details");
        }

        const userData = await response.json();
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "",
          password: "",
        });
      } catch (error) {
        setStatus({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchUser();
    }
  }, [userID, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update user");
      }

      setStatus({ type: "success", message: "User updated successfully." });
      if (onUpdated) {
        onUpdated();
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="create-user-card">
      <style>{`
        .create-user-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .create-user-form {
          display: grid;
          gap: 18px;
        }

        .create-user-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #334155;
          font-weight: 600;
        }

        .create-user-form input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 12px 14px;
          background: #f8fafc;
          color: #0f172a;
          font-size: 1rem;
        }

        .create-user-form input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .submit-button {
          border: none;
          border-radius: 999px;
          background: #3b82f6;
          color: #ffffff;
          padding: 12px 22px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .submit-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>

      {status.message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            backgroundColor: status.type === "success" ? "#e6f4ea" : "#fce8e6",
            color: status.type === "success" ? "#137333" : "#c5221f",
          }}
        >
          {status.message}
        </div>
      )}

      {loading ? (
        <p>Loading user details...</p>
      ) : (
        <form className="create-user-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
            />
          </label>

          <label>
            Role
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Admin, Editor, Member"
              required
            />
          </label>

          <label>
            New Password (optional)
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              minLength={6}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Update User
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Editusers;

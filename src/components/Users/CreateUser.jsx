import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "react-app-production-94f9.up.railway.app";

function CreateUsers() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const { user } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create user");
      }

      setStatus({ type: "success", message: "User created successfully." });
      setFormData({ name: "", email: "", role: "", password: "" });
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
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            minLength={6}
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

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUsers;

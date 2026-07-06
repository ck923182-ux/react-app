import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5002/api";

function AllUser() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const fetchUsers = () => {
    fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="users-page">
      <style>{`
        .users-page {
          min-height: 100vh;
          padding: 24px;
          background: #eef2ff;
        }

        .users-shell {
          max-width: 980px;
          margin: 0 auto;
        }

        .users-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .users-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
        }

        .users-subtitle {
          margin: 8px 0 0;
          color: #475569;
          line-height: 1.7;
          max-width: 680px;
        }

        .add-user-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 18px 34px rgba(37, 99, 235, 0.18);
        }

        .cards-container {
          display: grid;
          gap: 18px;
        }

        .user-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
        }

        .user-card h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 1.1rem;
          text-transform: capitalize;
        }

        .user-card p {
          margin: 8px 0;
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .user-card span {
          margin-left: 6px;
          color: #0f172a;
          font-weight: 700;
        }

        .btn-link {
          color: #3b82f6;
          font-weight: 700;
          text-decoration: none;
          margin-right: 12px;
          cursor: pointer;
        }

        .btn-delete {
          color: #ef4444;
        }

        @media (max-width: 720px) {
          .users-header {
            flex-direction: column;
            align-items: stretch;
          }

          .add-user-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="users-shell">
        <div className="users-header">
          <div>
            <h1 className="users-title">All Users</h1>
            <p className="users-subtitle">Review users and add a new user from the create page.</p>
          </div>

          <Link to="/users/new" className="add-user-button">
            + Add User
          </Link>
        </div>

        <div className="cards-container">
          {users.length > 0 ? (
            users.map((userItem) => (
              <div className="user-card" key={userItem.id || userItem._id}>
                <h2>{userItem.name || "Unnamed User"}</h2>
                <p>
                  Email:<span>{userItem.email || "—"}</span>
                </p>
                <p>
                  Role:<span>{userItem.role || "Member"}</span>
                </p>
                <div>
                  <Link to={`/users/edit/${userItem._id}`} className="btn-link">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(userItem._id)} className="btn-link btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="user-card">
              <h2>No users available</h2>
              <p>There are no users yet. Click Add User to create a new account.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUser;

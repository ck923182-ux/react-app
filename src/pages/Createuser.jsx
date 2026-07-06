import React from "react";
import { Link } from "react-router-dom";
import CreateUsers from "../components/Users/CreateUser";

function CreateUser() {

    return (
        <div className="users-page">
            <style>{`
                .users-page {
                    min-height: 100vh;
                    padding: 36px 20px;
                    background: #f7f8fb;
                }

                .page-card {
                    max-width: 760px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 26px;
                    box-shadow: 0 24px 60px rgba(17, 24, 39, 0.08);
                    padding: 32px;
                }

                .page-card h1 {
                    margin: 0 0 8px;
                    font-size: 2rem;
                    color: #102a43;
                }

                .page-card p {
                    margin: 0 0 24px;
                    color: #52606d;
                    line-height: 1.7;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    color: #3b82f6;
                    text-decoration: none;
                    margin-bottom: 18px;
                    font-weight: 700;
                }
            `}</style>

            <div className="page-card">
                <Link to="/users" className="back-link">
                    ← Back to users
                </Link>
                <h1>Create User</h1>
                <p>Fill out the form below to add a new user.</p>
                <CreateUsers />
            </div>
        </div>
    );
}
export default CreateUser;
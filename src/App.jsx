import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";
import AllUser from "./pages/AllUser";
import CreateUser from "./pages/Createuser";
import EditUser from "./pages/EditUser";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/blogs/new" element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            } />
            <Route path="/blogs/edit/:id" element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <AllUser />
              </ProtectedRoute>
            } />
            <Route path="/users/new" element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            } />
            <Route path="/users/edit/:id" element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

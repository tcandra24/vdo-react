import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "context/Auth";

import Register from "../views/auth/register";
import Login from "../views/auth/login";

import Dashboard from "../views/admin/dashboard/index";

import UsersIndex from "../views/admin/users/index";
import UsersCreate from "../views/admin/users/create";
import UsersEdit from "../views/admin/users/edit";

import VideosIndex from "../views/admin/videos/index";
import VideosCreate from "../views/admin/videos/create";
import VideoEdit from "../views/admin/videos/edit";

import Error404 from "views/errors/404";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/users/create"
        element={
          isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/videos"
        element={
          isAuthenticated ? <VideosIndex /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/videos/create"
        element={
          isAuthenticated ? <VideosCreate /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/videos/edit/:id"
        element={
          isAuthenticated ? <VideoEdit /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

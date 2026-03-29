import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { AdminPage } from "../pages/dashboard/AdminPage";
import { EditorPage } from "../pages/dashboard/EditorPage";
import { ProfilePage } from "../pages/dashboard/ProfilePage";
import { SettingsPage } from "../pages/dashboard/SettingsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { BlogDetailPage } from "../pages/public/BlogDetailPage";
import { HomePage } from "../pages/public/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blogs/:slug", element: <BlogDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "editor", element: <EditorPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
      {
        element: <ProtectedRoute requireAdmin />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

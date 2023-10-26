import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { Error, Home, Login } from "@/pages";

const ProtectedRoute = () =>
  useAuth().auth ? <Outlet /> : <Navigate to="login" replace />;

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="home" replace /> },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: "test", element: <></> }],
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export { App };

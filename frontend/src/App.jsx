import "./App.css";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./ui/Sidebar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageNotFound } from "./ui/PageNotFound";
import toast, { Toaster } from "react-hot-toast";
import { Layaout } from "./ui/Layaout";
import { Notes } from "./pages/Notes";
import { Login } from "./ui/Login";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { Register } from "./ui/Register";

const router = createBrowserRouter([
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layaout />,
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        path: "notes",
        element: <Notes />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

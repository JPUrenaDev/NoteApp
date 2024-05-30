import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  console.log(location);
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);
  return userId && children;
};

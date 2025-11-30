import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshToken } from "../api/auth.js";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        try {
          await refreshToken();
          setAllowed(true);
        } catch {
          setAllowed(false);
        }
      } else {
        setAllowed(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  return allowed ? children : <Navigate to="/login" replace />;
}

import { useEffect } from "react";
import api from "../api/axios";
import { refreshToken, logout } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser, logoutUser } from "../store/slices/authSlice";
import Avatar from "@mui/material/Avatar";

// Helper to generate initials
const stringAvatar = (name) => {
  if (!name) return {};
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return { children: initials };
};

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.post("/profile");
        dispatch(setUser(res.data.data));
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            const newToken = await refreshToken();
            dispatch(setToken(newToken));

            const res = await api.post("/profile");
            dispatch(setUser(res.data.data));
          } catch {
            dispatch(logoutUser());
            logout();
          }
        }
      }
    };
    loadProfile();
  }, [dispatch]);

  return (
    <main className=" min-h-screen w-screen bg-[#ffffff]">
      <h1>Home</h1>

      {user && (
        <>
          <Avatar
            {...(!user.avatarUrl
              ? stringAvatar(user.fullName)
              : { alt: user.fullName, src: user.avatarUrl })}
            sx={{ width: 40, height: 40 }}
          />
          <p>Name: {user.fullName}</p>
          <p>Wallet: ₹{user.walletBalance}</p>
        </>
      )}

      <button
        onClick={() => {
          dispatch(logoutUser());
          logout();
        }}
      >
        Logout
      </button>
    </main>
  );
}

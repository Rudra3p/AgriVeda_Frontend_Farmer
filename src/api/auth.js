import api from "./axios";

export const refreshToken = async () => {
  try {
    const res = await api.post("/refresh-token");
    const newAccessToken = res.data?.data?.accessToken || res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    localStorage.removeItem("accessToken");
    throw err;
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch {}
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

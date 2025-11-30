import { useState } from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobileNumber, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { mobileNumber, password });
      const token = res.data?.data?.accessToken;
      dispatch(setToken(token));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className=" h-screen w-screen bg-[#d0d0d080] flex items-center justify-center">
      <section className=" h-[75%] w-[30%] bg-[#ffffff] flex flex-col items-center justify-evenly  shadow-[0px_0px_10px_#00000080] rounded-[30px]">
      <h1 className=" text-[30px] font-bold">Login</h1>
        {/* Mobile Number */}
        <FormControl variant="standard" className=" w-[65%]">
          <InputLabel htmlFor="mobile-number">Mobile Number</InputLabel>
          <Input
            id="mobile-number"
            value={mobileNumber}
            onChange={(e) => setMobile(e.target.value)}
          />
        </FormControl>

        {/* Password */}
        <FormControl variant="standard" className=" w-[65%]">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Login Button */}
        <Button variant="contained" onClick={handleLogin} className=" w-[70%]">
          Login
        </Button>
      </section>
    </main>
  );
}

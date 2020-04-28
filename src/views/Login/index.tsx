import React from "react";
import logo from "../../assets/logo.png";
import "./index.css";

const apiUrl = process.env.API_URL || "http://localhost:3005";

function Login(props: any) {
  return (
    <div>
      <img src={logo} alt="Lirify" />
      <a href={`${apiUrl}/api/auth/spotify`}>Login with Spotify</a>
    </div>
  );
}

export default Login;

import React from "react";
import logo from "../../public/logo.svg";
import "./index.css";

function Login(props: any) {
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <a
          className="Login-link"
          href={`http://${window.location.hostname}:3005/auth/spotify`}
        >
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;

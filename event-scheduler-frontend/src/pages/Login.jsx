// Created by Philip Brunet

import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import AlertContext from "../context/AlertContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { getCookie, serverUrl } from "../App";
import TextInput from "../components/TextInput.jsx";

function Login() {
  const emptySubmission = {
    username: "",
    password: "",
    email: "",
  };
  const { jwt, setJwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const [submission, setSubmission] = useState(emptySubmission);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubmission((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submission.password.length < 8) {
      setAlert({
        msg: "Passwords must be at least 8 characters long.",
        isErr: true,
      });
    } else {
      axios
        .post(`${serverUrl}/login`, submission, {
          withCredentials: true,
        })
        .then((res) => {
          const jwtCookie = getCookie("jwt");
          setJwt(jwtCookie);
          setSubmission(emptySubmission);
          setAlert({
            msg: res.data.message,
            isErr: false,
          });
        })
        .catch((err) => {
          console.log(err);
          const errMsg =
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
              ? err.response.data.message + ": " + err.response.data.error
              : `Login failed due to error: ${err}`;
          setAlert({
            msg: errMsg,
            isErr: true,
          });
        });
    }
  };
  useEffect(() => {
    if (jwt !== null) {
      navigate("/", { replace: true });
    }
  }, [jwt]);
  return (
    <div className="login">
      <h1 className="login__heading">Login</h1>
      <h2 className="login__subheading">Welcome Back</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <TextInput
          name="username"
          value={submission.username}
          onChange={handleChange}
          labelText="Username"
        />
        <TextInput
          name="password"
          type="password"
          value={submission.password}
          onChange={handleChange}
          labelText="Password"
        />
        <div className="login__button__container">
          <button className="login__button" type="submit">
            Login
          </button>
          <button
            className="login__button"
            type="button"
            onClick={() => navigate("/signup")}
          >
            New Here? Switch to Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

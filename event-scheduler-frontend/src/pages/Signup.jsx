// Created by Philip Brunet

import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { api } from "../App";
import TextInput from "../components/TextInput";

function Signup() {
  const emptySubmission = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
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
    } else if (submission.password !== submission.repeatPassword) {
      setAlert({
        msg: "Passwords do not match.",
        isErr: true,
      });
    } else {
      api
        .post(`/user`, submission, {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          setJwt(res.data.token);
          setSubmission(emptySubmission);
          setAlert({
            msg: res.data.message,
            isErr: false,
          });
        })
        .catch((err) => {
          console.error(err);
          const errMsg =
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
              ? err.response.data.message + ": " + err.response.data.error
              : `Signup failed due to error: ${err}`;
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
    <div className="signup">
      <h1 className="signup__heading">Sign Up</h1>
      <h2 className="signup__subheading">Let's Get Started</h2>
      <form className="signup__form" onSubmit={handleSubmit}>
        <TextInput
          name="username"
          value={submission.username}
          onChange={handleChange}
          labelText="Username"
        />
        <TextInput
          name="email"
          type="email"
          value={submission.email}
          onChange={handleChange}
          labelText="Email"
        />
        <TextInput
          name="password"
          type="password"
          value={submission.password}
          onChange={handleChange}
          labelText="Password"
        />
        <TextInput
          name="repeatPassword"
          type="password"
          placeholder="repeat password"
          value={submission.repeatPassword}
          onChange={handleChange}
          labelText="Repeat Password"
        />
        <div className="signup__button__container">
          <button type="submit" className="signup__button">
            Sign Up
          </button>
          <button
            className="signup__button"
            type="button"
            onClick={() => navigate("/login")}
          >
            Been Here Before? Switch to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

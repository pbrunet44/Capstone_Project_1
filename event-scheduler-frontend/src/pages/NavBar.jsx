// Created by Philip Brunet

import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import AlertContext from "../context/AlertContext";
import "./NavBar.css";

function NavBar() {
  const { jwt, setJwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
    setAlert({ msg: "Logged out successfully.", isErr: false });
  };
  return (
    <div className="nav-bar">
      <div className="nav-bar__header__container">
        <h2 className="nav-bar__title" onClick={() => navigate("/")}>
          Event Scheduler
        </h2>
        <nav className="nav-bar__nav">
          <NavLink to={"/"} className="nav-bar__link">
            Home
          </NavLink>
          {jwt === null && (
            <NavLink to={"/login"} className="nav-bar__link">
              Login
            </NavLink>
          )}
          {jwt === null && (
            <NavLink to={"/signup"} className="nav-bar__link">
              Sign Up
            </NavLink>
          )}
          {jwt !== null && (
            <NavLink to={"/create"} className="nav-bar__link">
              Create Event
            </NavLink>
          )}
          {jwt !== null && (
            <NavLink to={"/events"} className="nav-bar__link">
              My Events
            </NavLink>
          )}
          {jwt !== null && (
            <NavLink to={"/myprofile"} className="nav-bar__link">
              My Profile
            </NavLink>
          )}
          {jwt !== null && (
            <NavLink to={"/"} className="nav-bar__link" onClick={logout}>
              Logout
            </NavLink>
          )}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;

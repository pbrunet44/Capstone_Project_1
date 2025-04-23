import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
import { api } from "../App";
import TextInput from "../components/TextInput.jsx";

function MyProfile() {
  const emptySubmission = {
    username: "",
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    email: "",
  };
  const { jwt, setJwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const [submission, setSubmission] = useState(emptySubmission);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubmission((prev) => ({ ...prev, [name]: event.target.value }));
  };
  let initialSetup = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submission.newPassword !== "" && submission.newPassword.length < 8) {
      setAlert({
        msg: "Passwords must be at least 8 characters long.",
        isErr: true,
      });
    } else if (submission.repeatNewPassword !== submission.newPassword) {
      setAlert({
        msg: "New password must match",
        isErr: true,
      });
    } else {
      api
        .put("/user", submission, {
          withCredentials: true,
        })
        .then((res) => {
          setUser({
            ...user,
            username:
              submission.username !== "" ? submission.username : user.username,
            email: submission.email !== "" ? submission.email : user.email,
          });
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
              : `Error updating user info: ${err}`;
          setAlert({
            msg: errMsg,
            isErr: true,
          });
        });
    }
  };
  useEffect(() => {
    if (jwt === null) {
      navigate("/login", { replace: true });
    }
  }, [jwt]);

  useEffect(() => {
    if (!initialSetup) {
      initialSetup = true;
      api
        .get("/user", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err);
          const errMsg =
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
              ? err.response.data.message + ": " + err.response.data.error
              : `Error updating user info: ${err}`;
          setAlert({
            msg: errMsg,
            isErr: true,
          });
        });
    }
  }, []);

  const isoStringToDateString = (dateIso) => {
    const date = new Date(dateIso);
    return date.toDateString();
  };

  return (
    <div className="my-profile">
      <h1 className="my-profile__heading">My Profile</h1>
      {user && (
        <div className="my-profile__data__container">
          <h2 className="my-profile__data__subheading">{user.username}</h2>
          <p className="my-profile__data__body">Email: {user.email}</p>
          <p className="my-profile__data__body">
            User since {isoStringToDateString(user.createdAt)}
          </p>
        </div>
      )}
      <form className="my-profile__form" onSubmit={handleSubmit}>
        <h1 className="my-profile__form__heading">Update Profile</h1>
        <p className="my-profile__form__body">
          Update your username, email, or password.
        </p>
        <p className="my-profile__form__body">
          Anything you would like not to change, leave blank.
        </p>
        <p className="my-profile__form__body">
          This will not change any names or emails that you've already provided
          to event organizers.
        </p>
        <TextInput
          name="username"
          placeholder="new username"
          value={submission.username}
          onChange={handleChange}
          labelText="New Username"
          required={false}
        />
        <TextInput
          name="email"
          type="email"
          placeholder="email@example.com"
          value={submission.email}
          onChange={handleChange}
          labelText="New Email"
          required={false}
        />
        <TextInput
          name="newPassword"
          type="password"
          placeholder="new password"
          value={submission.newPassword}
          onChange={handleChange}
          labelText="New Password"
          required={false}
        />
        <TextInput
          name="repeatNewPassword"
          type="password"
          placeholder="repeat new password"
          value={submission.repeatNewPassword}
          onChange={handleChange}
          labelText="Repeat New Password"
          required={false}
        />
        <TextInput
          name="oldPassword"
          type="password"
          placeholder="old password"
          value={submission.oldPassword}
          onChange={handleChange}
          labelText="Old Password (Required)"
          required={true}
        />
        <button className="my-profile__button" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default MyProfile;

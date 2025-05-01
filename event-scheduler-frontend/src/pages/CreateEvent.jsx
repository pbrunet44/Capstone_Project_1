// Created by Philip Brunet

import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import CheckboxInput from "../components/CheckboxInput";
import "./CreateEvent.css";
import EventService from "../services/eventService";

function CreateEvent() {
  const emptySubmission = {
    name: "",
    description: "",
    isRecurring: false,
  };
  const { jwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const [submission, setSubmission] = useState(emptySubmission);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubmission((prev) => ({ ...prev, [name]: event.target.value }));
  };
  const handleCheck = () => {
    setSubmission((prev) => ({ ...prev, isRecurring: !prev.isRecurring }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    EventService.eventPost(submission)
      .then((res) => {
        setAlert({
          msg: res.data.message,
          isErr: false,
        });
        setSubmission(emptySubmission);
        navigate(`/event/${res.data.event._id.toString()}`);
      })
      .catch((err) => {
        console.error(err);
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
  };
  useEffect(() => {
    if (jwt === null) {
      navigate("/login");
    }
  }, [jwt]);
  return (
    <div className="create-event">
      <h1 className="create-event__heading">Create Event</h1>
      <form className="create-event__form" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          placeholder="Game Night, Work Meeting, etc."
          value={submission.name}
          onChange={handleChange}
          labelText="Event Name"
        />
        <TextArea
          name="description"
          placeholder="Address, catering info, Zoom link, etc."
          value={submission.description}
          onChange={handleChange}
          labelText="Description"
        />
        <CheckboxInput
          name="isRecurring"
          labelText="Event will be recurring each week"
          checked={submission.isRecurring}
          onChange={handleCheck}
        />
        <button className="create-event__button" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;

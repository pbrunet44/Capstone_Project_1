// Created by Philip Brunet

import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import TokenContext from "../context/TokenContext";
import axios from "axios";
import "./EventList.css";
import { serverUrl } from "../App";
import EventTile from "../components/EventTile";

function EventList() {
  const { jwt, setJwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const [events, setEvents] = useState([]);
  const [role, setRole] = useState("attendee");
  const [page, setPage] = useState({ attendee: 0, organizer: 0 });
  const [numPages, setNumPages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt === null) {
      navigate("/", { replace: true });
    }
  }, [jwt]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/myevents?role=${role}&p=${page[role]}`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvents(res.data.events);
        setNumPages(res.data.numPages);
      })
      .catch((err) => {
        console.error(err);
        setAlert({
          msg: `Error loading events: ${err}`,
          isErr: true,
        });
      });
  }, [role, page[role]]);
  return (
    <div className="event-list">
      <h1 className="event-list__heading">My Events</h1>
      <div className="event-list__role__container">
        <h3
          className="event-list__role"
          onClick={() => setRole("attendee")}
          style={{
            borderBottom:
              role === "attendee" ? "5px solid #11837b" : "5px transparent",
          }}
        >
          Attended Events
        </h3>
        <h3
          className="event-list__role"
          onClick={() => setRole("organizer")}
          style={{
            borderBottom:
              role === "organizer" ? "5px solid #11837b" : "5px transparent",
          }}
        >
          Organized Events
        </h3>
      </div>

      {events.map((event) => {
        return (
          <div key={event._id}>
            <EventTile event={event} />
          </div>
        );
      })}
      <div className="event-list__page__container">
        <button
          className={
            page[role] > 0
              ? "event-list__button"
              : "event-list__deactivated-button"
          }
          onClick={() =>
            page[role] > 0
              ? setPage({ ...page, [role]: page[role] - 1 })
              : () => {}
          }
        >
          Last Page
        </button>
        <p className="event-list__page-number">
          {page[role] + 1} of {numPages}
        </p>
        <button
          className={
            page[role] < numPages - 1
              ? "event-list__button"
              : "event-list__deactivated-button"
          }
          onClick={() =>
            page[role] < numPages - 1
              ? setPage({ ...page, [role]: page[role] + 1 })
              : () => {}
          }
        >
          Next Page
        </button>
      </div>
      <button
        className="event-list__button"
        onClick={() => navigate("/create")}
      >
        Organize a New Event
      </button>
    </div>
  );
}

export default EventList;

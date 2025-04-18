// Created by Philip Brunet

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventTile.css";

function EventTile({ event }) {
  const navigate = useNavigate();
  return (
    <div className="event-tile">
      <h2 className="event-tile__name">{event.name}</h2>
      <h4 className="event-tile__description">
        {event.description.length < 90
          ? event.description
          : `${event.description.slice(0, 90)}...`}
      </h4>
      <h4 className="event-tile__is-recurring">
        {event.isRecurring ? "Weekly Event" : "One-Time Event"}
      </h4>
      {event.finalizedTime && (
        <h4 className="event-tile__finalized-time">
          Finalized Time: {event.finalizedTime}
        </h4>
      )}
      <p
        className="event-tile__view-event"
        onClick={() => navigate(`/event/${event._id.toString()}`)}
      >
        View Event →
      </p>
    </div>
  );
}

export default EventTile;

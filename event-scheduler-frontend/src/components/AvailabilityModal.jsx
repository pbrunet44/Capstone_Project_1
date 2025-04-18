// Created by Philip Brunet

import { useState } from "react";
import "./AvailabilityModal.css";
import { numToWeekday } from "../pages/Event";
import { numToHour } from "../pages/Event";
import TextInput from "./TextInput";
import _ from "lodash";
import CheckboxInput from "./CheckboxInput";
import { useActionData } from "react-router-dom";

//const emptyCalendar = Array.from({ length: 7 }, () => new Array(24).fill(0));
const emptySubmission = {
  name: "",
  email: "",
  notes: "",
  calendar: Array.from({ length: 7 }, () => new Array(24).fill(0)),
  useAccountData: false,
};

function AvailabilityModal({
  submitAvailabilityModal,
  closeModal,
  loggedIn = false,
}) {
  const [brush, setBrush] = useState("best");
  const [submission, setSubmission] = useState(emptySubmission);
  const markCalendar = (i, j) => {
    let weight;
    switch (brush) {
      case "best":
        weight = 4;
        break;
      case "manageable":
        weight = 3;
        break;
      case "inconvenient":
        weight = 2;
        break;
      case "conditional":
        weight = 1;
        break;
      default:
        weight = 0;
        break;
    }
    if (submission.calendar[i][j] === weight) {
      weight = 0;
    }
    let newSubmision = _.cloneDeep(submission);
    newSubmision.calendar[i][j] = weight;
    setSubmission(newSubmision);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newSubmision = _.cloneDeep(submission);
    newSubmision[name] = value;
    setSubmission(newSubmision);
  };
  const handleCheck = () => {
    setSubmission((prev) => ({
      ...prev,
      useAccountData: !prev.useAccountData,
    }));
  };

  return (
    <div className="availability-modal">
      <h2 className="availability-modal__heading">Enter Your Availability</h2>
      <p className="availability-modal__body">
        Click on the buttons below to switch between your different types of
        availability.
      </p>
      <p className="availability-modal__body">
        Click a timeslot on the calendar to mark your availability. Click a
        timeslot again to erase.
      </p>
      <div className="availability-modal__brush__container">
        <p
          className="availability-modal__brush"
          onClick={() => setBrush("best")}
          style={{
            borderBottom:
              brush === "best"
                ? "5px solid rgba(17, 131, 123, 1)"
                : "5px solid transparent",
          }}
        >
          Best Times
        </p>
        <p
          className="availability-modal__brush"
          onClick={() => setBrush("manageable")}
          style={{
            borderBottom:
              brush === "manageable"
                ? "5px solid rgba(17, 131, 123, 0.75)"
                : "5px solid transparent",
          }}
        >
          Manageable Times
        </p>
        <p
          className="availability-modal__brush"
          onClick={() => setBrush("inconvenient")}
          style={{
            borderBottom:
              brush === "inconvenient"
                ? "5px solid rgba(17, 131, 123, 0.5)"
                : "5px solid transparent",
          }}
        >
          Inconvenient Times
        </p>
        <p
          className="availability-modal__brush"
          onClick={() => setBrush("conditional")}
          style={{
            borderBottom:
              brush === "conditional"
                ? "5px solid rgba(17, 131, 123, 0.25)"
                : "5px solid transparent",
          }}
        >
          Conditional Times
        </p>
      </div>

      <div className="availability-modal__calendar">
        <div className="availability-modal__calendar__row">
          {new Array(25).fill(" ").map((hour, i) => {
            if (i % 3 === 1) {
              return (
                <div
                  className="availability-modal__calendar__time-label"
                  key={i}
                >
                  {numToHour(i - 1)}
                </div>
              );
            } else {
              return (
                <div
                  className="availability-modal__calendar__no-time-label"
                  key={i}
                >
                  &nbsp;
                </div>
              );
            }
          })}
        </div>

        {submission.calendar.map((day, i) => {
          return (
            <div className="availability-modal__calendar__row" key={i}>
              <div className="availability-modal__calendar__day-name">
                {numToWeekday[i]}
              </div>
              {day.map((weight, j) => {
                return (
                  <div
                    className="availability-modal__calendar__timeslot"
                    key={j}
                    style={{
                      backgroundColor: `rgba(17, 131, 123, ${
                        submission.calendar[i][j] / 4
                      }`,
                    }}
                    onClick={() => {
                      markCalendar(i, j);
                    }}
                  >
                    &nbsp;
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <h2 className="availability-modal__heading">
        Provide Name, Contact Info, and Notes for the Organizer
      </h2>
      <p className="availability-modal__body">
        Share your name to give the organizer an idea of who is coming to the
        event.
      </p>
      <p className="availability-modal__body">
        Share your email with the organizer so they can contact you when the
        event date and time are decided.
      </p>
      <p className="availability-modal__body">
        Share any notes about your availability to help the organizer schedule
        the event.
      </p>
      <p className="availability-modal__body">
        Providing these details is voluntary.
      </p>
      {loggedIn && (
        <CheckboxInput
          name="useAccountData"
          labelText="Use name and email from my account"
          checked={submission.useAccountData}
          onChange={handleCheck}
        />
      )}

      {!submission.useAccountData && (
        <TextInput
          name="name"
          value={submission.name}
          onChange={handleChange}
          placeholder="Name"
          labelText="Name (Optional)"
        />
      )}
      {!submission.useAccountData && (
        <TextInput
          name="email"
          type="email"
          value={submission.email}
          onChange={handleChange}
          placeholder="email@example.com"
          labelText="Email Address (Optional)"
        />
      )}
      <TextInput
        name="notes"
        value={submission.notes}
        onChange={handleChange}
        placeholder="Explain conditional availability, etc."
        labelText="Notes For Organizer (Optional)"
      />
      <div className="availability-modal__button__container">
        <button
          className="availability-modal__button"
          onClick={() => submitAvailabilityModal(submission)}
        >
          Submit
        </button>
        <button className="availability-modal__button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AvailabilityModal;

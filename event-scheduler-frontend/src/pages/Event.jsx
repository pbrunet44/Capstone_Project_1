// Created by Philip Brunet

import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import TokenContext from "../context/TokenContext";
import "./Event.css";
import _ from "lodash";
import Modal from "../components/Modal";
import { api, getCookie, setCookie } from "../App";
import FinalizationModal from "../components/FinalizationModal";
import AvailabilityModal from "../components/AvailabilityModal";

const emptyEvent = {
  name: "",
  description: "",
  isRecurring: false,
  finalizedTime: null,
  organizerId: null,
  id: null,
};

const emptyHeatmap = Array.from({ length: 7 }, () => new Array(24).fill(0));

export const numToWeekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const numToHour = (num, use24Hour = false) => {
  if (use24Hour) {
    return `${num}:00`;
  } else {
    if (num === 0) {
      return "12:00 AM";
    } else if (num === 12) {
      return "12:00 PM";
    } else if (num < 12) {
      return `${num}:00 AM`;
    } else {
      return `${num - 12}:00 PM`;
    }
  }
};

function Event() {
  const { id } = useParams();
  const { jwt, setJwt } = useContext(TokenContext);
  const { setAlert } = useContext(AlertContext);
  const [event, setEvent] = useState(emptyEvent);
  const [submissions, setSubmissions] = useState([]);
  const [heatmap, setHeatmap] = useState(emptyHeatmap);
  const [currModal, setCurrModal] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [organizerName, setOrganizerName] = useState(null);
  const [userIsOrganizer, setUserIsOrganizer] = useState(false);
  let initialSetup = false;

  const closeModal = () => {
    setCurrModal(null);
  };

  const submitAvailabilityModal = (newSubmision) => {
    setCurrModal(null);
    if (submitted) {
      // update existing submission
      api
        .put(`/submit/${id}`, newSubmision, {
          withCredentials: jwt !== null,
        })
        .then((updateRes) => {
          api.get(`/submissions/${id}`).then((submissionsRes) => {
            setSubmissions(submissionsRes.data.submissions);
            setSubmitted(true);
            setAlert({
              msg: "Availability updated successfully.",
              isErr: false,
            });
          });
        })
        .catch((err) => {
          console.error(err);
          setAlert({
            msg: err.response.data
              ? `${err.response.data.message}: ${err.response.data.error}`
              : `Error updating availability: ${err}`,
            isErr: true,
          });
        });
    } else {
      // New submission
      api
        .post(`/submit/${id}`, newSubmision, {
          withCredentials: jwt !== null,
        })
        .then((res) => {
          const tempSubmissions = _.cloneDeep(submissions);
          tempSubmissions.push({
            ...newSubmision,
            name:
              newSubmision.useAccountData && userIsOrganizer
                ? organizerName
                : newSubmision.name,
          });
          setSubmissions(tempSubmissions);
          setSubmitted(true);
          if (jwt === null) {
            // Set cookies when a logged out user submits availability
            // Used to prevent multiple submissions
            const eventsAttendingCookie = getCookie("eventsAttending");
            const oneYearSecs = 60 * 60 * 24 * 365;
            if (eventsAttendingCookie !== "") {
              const eventsAttending = JSON.parse(eventsAttendingCookie);
              eventsAttending.push(id);
              setCookie(
                "eventsAttending",
                JSON.stringify(eventsAttending),
                oneYearSecs
              );
            } else {
              setCookie("eventsAttending", JSON.stringify([id]), oneYearSecs);
            }
          }
          setAlert({
            msg: "Availability submitted successfully.",
            isErr: false,
          });
        })
        .catch((err) => {
          console.error(err);
          setAlert({
            msg: err.response.data
              ? `${err.response.data.message}: ${err.response.data.error}`
              : `Error submitting availability: ${err}`,
            isErr: true,
          });
        });
    }
  };

  const submitFinalizationModal = (selections) => {
    setCurrModal(null);
    api
      .post(
        `/finalize/${id}`,
        {
          finalizedTime: `${selections.day.value} at ${selections.time.value}`,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setAlert({
          msg: res.data.message,
          isErr: false,
        });
        setEvent(res.data.event);
      })
      .catch((err) => {
        console.error(err);
        setAlert({
          msg: `Error finalizing event: ${err}`,
          isErr: true,
        });
      });
  };

  useEffect(() => {
    if (submissions) {
      let newHeatmap = _.cloneDeep(emptyHeatmap);
      submissions.forEach((submission) => {
        for (let i = 0; i < submission.calendar.length; i++) {
          for (let j = 0; j < submission.calendar[i].length; j++) {
            if (submission.calendar[i][j] !== 0) {
              newHeatmap[i][j] += submission.calendar[i][j];
            }
          }
        }
      });
      setHeatmap(newHeatmap);
    }
  }, [submissions]);

  useEffect(() => {
    if (!initialSetup && id) {
      initialSetup = true;
      api
        .get(`/event/${id}`, { withCredentials: true })
        .then((res) => {
          setOrganizerName(res.data.organizerName);
          setUserIsOrganizer(res.data.userIsOrganizer);
          // Need to check local storage directly instead of Token Context in case
          // context isn't loaded yet
          const token = JSON.parse(localStorage.getItem("jwt"));
          if (token) {
            //if logged in, see if user has submitted by checking backend response
            setSubmitted(res.data.userHasSubmitted);
          } else {
            // if not logged in, see if user has submitted by checking cookies
            const eventsAttendingCookie = getCookie("eventsAttending");
            if (eventsAttendingCookie === "") {
              setSubmitted(false);
            } else {
              const eventsAttending = JSON.parse(eventsAttendingCookie);
              setSubmitted(eventsAttending.includes(id));
            }
          }
          setEvent(res.data.event);
          api
            .get(`/submissions/${id}`)
            .then((res) => {
              setSubmissions(res.data.submissions);
            })
            .catch((err) => {
              console.error(err);
              setSubmissions(null);
              setAlert({
                msg: `Error loading event submissions: ${err}`,
                isErr: true,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          setEvent(null);
        });
    }
  }, []);

  useEffect(() => {
    if (currModal !== null) {
      window.scrollTo({ top: 0 });
    }
  }, [currModal]);

  return (
    <div className="event">
      {!id && <h2>No ID provided</h2>}
      {!id && (
        <p>
          To access information about a specific event, please provide the ID of
          the event on the address bar. If you're logged in, you can click "My
          Events" to view all of your events.
        </p>
      )}
      {id && !event && <h2>Event not found</h2>}
      {id && !event && (
        <p>
          We're sorry, we weren't able to find an event with that ID. Please
          check if the ID is misspelled, or try again later.
        </p>
      )}
      {(!event || !id) && (
        <NavLink to={"/"}>To return to our homepage, click here.</NavLink>
      )}
      {id && event && <h1 className="event__heading">{event.name}</h1>}
      {id && event && organizerName && (
        <h2 className="event__subheading">Organized by {organizerName}</h2>
      )}

      <div className="event__body__container">
        {id && event && <p className="event__body">{event.description}</p>}
        {id && event && (
          <p className="event__body">
            {event.isRecurring
              ? "Event will repeat each week."
              : "Event will occur once."}
          </p>
        )}
      </div>
      {id && event && event.finalizedTime && !userIsOrganizer && (
        <h2 className="event__heading">
          Based on attendee submissions, the organizer has scheduled this event
          for {event.finalizedTime}.
        </h2>
      )}
      {id && event && event.finalizedTime && userIsOrganizer && (
        <h2 className="event__heading">
          You have finalized this event for {event.finalizedTime}.
        </h2>
      )}
      {id && event && event.finalizedTime && submissions && userIsOrganizer && (
        //It would be more secure to send emails server side, never providing them to the organizer,
        //but doing so would require buying a website domain and running an email server with an API.
        //I am not currently able to implement that functionality for this project.
        //I made sure to be clear emails are shared with the organizer for contacting purposes and
        //made the process opt-in. Users may avoid providing an email in their submission if they wish.
        <a
          className="event__mailto"
          href={`mailto:?bcc=${submissions.reduce((emailList, submission) => {
            return submission.email && submission.email !== ""
              ? emailList + `${submission.email}; `
              : emailList;
          }, "")}&subject=${
            event.name
          } Time Finalized&body=Hello everyone, after reviewing all of the submissions, the event will be held on ${
            event.finalizedTime
          }. Thank you.`}
        >
          Send Email to Attendees
        </a>
      )}
      {id && event && !event.finalizedTime && (
        <h2 className="event__share-url__heading">
          Share this event with other attendees:
        </h2>
      )}
      {id && event && !event.finalizedTime && (
        <div className="event__share-url__container">
          <input
            className="event__share-url"
            value={window.location.href}
            readOnly
          />
          <button
            className="event__button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setAlert({
                msg: "Copied event URL to clipboard",
                isErr: false,
              });
            }}
          >
            Copy URL
          </button>
        </div>
      )}
      {id && event && !event.finalizedTime && heatmap && (
        <h2 className="event__heatmap__heading"> Availability heatmap:</h2>
      )}
      {id && event && !event.finalizedTime && heatmap && submissions && (
        <div className="event__heatmap">
          <div className="event__heatmap__row">
            {new Array(25).fill(" ").map((hour, i) => {
              if (i % 3 === 1) {
                return (
                  <div className="event__heatmap__time-label" key={i}>
                    {numToHour(i - 1)}
                  </div>
                );
              } else {
                return (
                  <div className="event__heatmap__no-time-label" key={i}>
                    &nbsp;
                  </div>
                );
              }
            })}
          </div>

          {heatmap.map((day, i) => {
            return (
              <div className="event__heatmap__row" key={i}>
                <div className="event__heatmap__day-name">
                  {numToWeekday[i]}
                </div>
                {day.map((weight, j) => {
                  return (
                    <div
                      className="event__heatmap__timeslot"
                      key={j}
                      style={{
                        backgroundColor: `rgba(17, 131, 123, ${
                          submissions.length
                            ? weight / 4 / submissions.length
                            : 0
                        }`,
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
      )}
      {id && event && !event.finalizedTime && userIsOrganizer && (
        <h2 className="event__notes__heading">
          Scheduling notes from attendees:
        </h2>
      )}
      {id &&
        event &&
        !event.finalizedTime &&
        userIsOrganizer &&
        submissions &&
        submissions.length > 0 && (
          <ul className="event__notes__list">
            {submissions
              .filter((submission) => {
                return submission.notes !== "";
              })
              .map((submission) => {
                return (
                  <li className="event__note" key={submission._id}>
                    {submission.name
                      ? `${submission.name}: ${submission.notes}`
                      : `Anonymous: ${submission.notes}`}
                  </li>
                );
              })}
          </ul>
        )}
      {id && event && !event.finalizedTime && submitted === false && (
        <button
          className="event__button"
          onClick={() => setCurrModal("submit")}
        >
          Submit Your Availability
        </button>
      )}
      {id &&
        event &&
        !event.finalizedTime &&
        submitted === true &&
        jwt === null && (
          <button
            className="event__button"
            style={{ backgroundColor: "lightgray" }}
          >
            Already Submitted Availability
          </button>
        )}
      {id &&
        event &&
        !event.finalizedTime &&
        submitted === true &&
        jwt !== null && (
          <button
            className="event__button"
            onClick={() => setCurrModal("submit")}
          >
            Update Your Availability
          </button>
        )}
      {currModal === "submit" && (
        <>
          <Modal>
            <AvailabilityModal
              submitAvailabilityModal={submitAvailabilityModal}
              closeModal={closeModal}
              loggedIn={jwt !== null}
            />
          </Modal>
        </>
      )}
      {event && userIsOrganizer && !event.finalizedTime && (
        <button
          className="event__button"
          onClick={() => {
            setCurrModal("finalize");
          }}
        >
          Finalize Event
        </button>
      )}
      {currModal === "finalize" && (
        <>
          <Modal>
            <FinalizationModal
              submitFinalizationModal={submitFinalizationModal}
              closeModal={closeModal}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Event;

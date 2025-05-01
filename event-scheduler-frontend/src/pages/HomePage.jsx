// Created by Philip Brunet

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { jwt } = useContext(TokenContext);
  return (
    <div className="home-page">
      <h1 className="home-page__heading">Scheduling conflicts?</h1>
      <h1 className="home-page__heading">Plan your event with us.</h1>
      <p className="home-page__body">
        Other scheduling platforms focus on which times “work” or “don’t work”.
        Here, attendees are able to rank their availability, weighted from most
        convenient to least convenient. We’ll help you find those hidden gems in
        your group’s calendar for your next big meeting, reunion, or get
        together.
      </p>

      <div className="home-page__box">
        <div className="home-page__img__and__caption__container">
          <img
            className="home-page__img"
            src="https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <h1 className="home-page__caption">
            Finally get around to planning that summer picnic...
          </h1>
        </div>
        <div className="home-page__img__and__caption__container">
          <h1 className="home-page__caption">
            ...or rescheduling that project meeting...
          </h1>
          <img
            className="home-page__img"
            src="https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <div className="home-page__img__and__caption__container">
          <img
            className="home-page__img"
            src="https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <h1 className="home-page__caption">
            ...or getting everyone together for that game night
          </h1>
        </div>
      </div>
      {jwt && (
        <button
          className="home-page__button"
          onClick={() => navigate("/create")}
        >
          Organize a New Event
        </button>
      )}
      {!jwt && (
        <button
          className="home-page__button"
          onClick={() => navigate("/login")}
        >
          Ready to organize your event? Login or register here
        </button>
      )}
    </div>
  );
}

export default HomePage;

// Images credit:

// Christina Morillo
// https://www.pexels.com/photo/people-gathering-inside-white-building-1181408/
// https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

// Helena Lopes
// https://www.pexels.com/photo/group-of-people-sitting-on-white-mat-on-grass-field-745045/
// https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

// cottonbro studio
// https://www.pexels.com/photo/person-in-black-pants-sitting-on-floor-4691567/
// https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

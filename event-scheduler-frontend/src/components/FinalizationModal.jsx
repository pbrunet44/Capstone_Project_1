// Created by Philip Brunet

import { useState } from "react";
import "./FinalizationModal.css";
import _ from "lodash";
import Select from "react-select";

const dayOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const timeOptions = [
  { value: "12:00 AM", label: "12:00 AM" },
  { value: "1:00 AM", label: "1:00 AM" },
  { value: "2:00 AM", label: "2:00 AM" },
  { value: "3:00 AM", label: "3:00 AM" },
  { value: "4:00 AM", label: "4:00 AM" },
  { value: "5:00 AM", label: "5:00 AM" },
  { value: "6:00 AM", label: "6:00 AM" },
  { value: "7:00 AM", label: "7:00 AM" },
  { value: "8:00 AM", label: "8:00 AM" },
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
  { value: "5:00 PM", label: "5:00 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
  { value: "7:00 PM", label: "7:00 PM" },
  { value: "8:00 PM", label: "8:00 PM" },
  { value: "9:00 PM", label: "9:00 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
  { value: "11:00 PM", label: "11:00 PM" },
];

const timeOptions24hr = [
  { value: "0:00", label: "0:00" },
  { value: "1:00", label: "1:00" },
  { value: "2:00", label: "2:00" },
  { value: "3:00", label: "3:00" },
  { value: "4:00", label: "4:00" },
  { value: "5:00", label: "5:00" },
  { value: "6:00", label: "6:00" },
  { value: "7:00", label: "7:00" },
  { value: "8:00", label: "8:00" },
  { value: "9:00", label: "9:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
];

function FinalizationModal({ submitFinalizationModal, closeModal }) {
  const [selections, setSelections] = useState({
    day: dayOptions[0],
    time: timeOptions[0],
  });

  const handleChangeDay = (selectedOption) => {
    setSelections({ ...selections, day: selectedOption });
  };
  const handleChangeTime = (selectedOption) => {
    setSelections({ ...selections, time: selectedOption });
  };
  return (
    <div className="finalization-modal">
      <h2 className="finalization-modal__heading">Finalize the Event Time</h2>
      <label
        htmlFor="day"
        aria-label="day"
        className="finalization-modal__label"
      >
        Day
      </label>
      <Select
        className="finalization-modal__select"
        name="day"
        id="day"
        value={selections.day}
        onChange={handleChangeDay}
        options={dayOptions}
        classNamePrefix="select-day"
        selectProps={{ "data-testid": "select-time" }}
      />
      <label htmlFor="time" className="finalization-modal__label">
        Time
      </label>
      <Select
        className="finalization-modal__select"
        name="time"
        id="time"
        value={selections.time}
        onChange={handleChangeTime}
        options={timeOptions}
        classNamePrefix="select-time"
      />
      <div className="finalization-modal__button__container">
        <button
          className="finalization-modal__button"
          onClick={() => submitFinalizationModal(selections)}
        >
          Finalize
        </button>
        <button className="finalization-modal__button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default FinalizationModal;

// Created by Philip Brunet

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AvailabilityModal from "../components/AvailabilityModal";

describe("AvailabilityModal component", () => {
  it('Renders a header with the text "Finalize the Event Time"', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const headerElement = screen.getByText("Enter Your Availability");
    expect(headerElement).toBeInTheDocument();
  });
  it('Renders a paragraph tag with the text "Click on the buttons below to switch between your different types of availability."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Click on the buttons below to switch between your different types of availability."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it('Renders a paragraph tag with the text "Click a timeslot on the calendar to mark your availability. Click a timeslot again to erase."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Click a timeslot on the calendar to mark your availability. Click a timeslot again to erase."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it('Renders paragraph tags with the names of the four types of brushes "Best Times", "Manageable Times", "Inconvenient Times", and "Conditional Times"', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bestTimesElement = screen.getByText("Best Times");
    expect(bestTimesElement).toBeInTheDocument();
    const manageableTimesElement = screen.getByText("Manageable Times");
    expect(manageableTimesElement).toBeInTheDocument();
    const inconvenientTimesElement = screen.getByText("Inconvenient Times");
    expect(inconvenientTimesElement).toBeInTheDocument();
    const worstTimesElement = screen.getByText("Conditional Times");
    expect(worstTimesElement).toBeInTheDocument();
  });
  it("Renders the availability calendar", () => {
    const { container } = render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const calendarRowElements = container.getElementsByClassName(
      "availability-modal__calendar__row"
    );
    expect(calendarRowElements.length).toBe(8);

    const timeLabelElements = container.getElementsByClassName(
      "availability-modal__calendar__time-label"
    );
    expect(timeLabelElements.length).toBe(8);

    const noTimeLabelElements = container.getElementsByClassName(
      "availability-modal__calendar__no-time-label"
    );
    expect(noTimeLabelElements.length).toBe(17);

    const dayNameElements = container.getElementsByClassName(
      "availability-modal__calendar__day-name"
    );
    expect(dayNameElements.length).toBe(7);

    const timeslotElements = container.getElementsByClassName(
      "availability-modal__calendar__timeslot"
    );
    expect(timeslotElements.length).toBe(24 * 7);
  });
  it('Renders a paragraph tag with the text "Share your name to give the organizer an idea of who is coming to the event."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Share your name to give the organizer an idea of who is coming to the event."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it('Renders a paragraph tag with the text "Share your email with the organizer so they can contact you when the event date and time are decided."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Share your email with the organizer so they can contact you when the event date and time are decided."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it('Renders a paragraph tag with the text "Share any notes about your availability to help the organizer schedule the event."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Share any notes about your availability to help the organizer schedule the event."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it('Renders a paragraph tag with the text "Providing these details is voluntary."', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const bodyElement = screen.getByText(
      "Providing these details is voluntary."
    );
    expect(bodyElement).toBeInTheDocument();
  });
  it("Renders a TextInput component for entering a name", () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const labelElement = screen.getByText("Name (Optional)");
    expect(labelElement).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText("Name");
    expect(inputElement).toBeInTheDocument();
  });

  it("Renders a TextInput component for entering an email", () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const labelElement = screen.getByText("Email Address (Optional)");
    expect(labelElement).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText("email@example.com");
    expect(inputElement).toBeInTheDocument();
  });
  it("Renders a TextInput component for entering notes", () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const labelElement = screen.getByText("Notes For Organizer (Optional)");
    expect(labelElement).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText(
      "Explain conditional availability, etc."
    );
    expect(inputElement).toBeInTheDocument();
  });
  it('Renders a button with the text "Submit"', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const submitButtonElement = screen.getByText("Submit");
    expect(submitButtonElement).toBeInTheDocument();
  });
  it('Renders a button with the text "Cancel"', () => {
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={() => {}}
      />
    );
    const cancelButtonElement = screen.getByText("Cancel");
    expect(cancelButtonElement).toBeInTheDocument();
  });
  it('Clicks the "Submit" button, which triggers the submitAvailabilityModal prop function', () => {
    const mockSubmitAvailabilityModal = vi.fn();
    render(
      <AvailabilityModal
        submitAvailabilityModal={mockSubmitAvailabilityModal}
        closeModal={() => {}}
      />
    );
    const submitButtonElement = screen.getByText("Submit");
    expect(submitButtonElement).toBeInTheDocument();
    fireEvent.click(submitButtonElement);
    expect(mockSubmitAvailabilityModal).toHaveBeenCalled();
  });
  it('Clicks the "Cancel" button, which triggers the closeModal prop function', () => {
    const mockCloseModal = vi.fn();
    render(
      <AvailabilityModal
        submitAvailabilityModal={() => {}}
        closeModal={mockCloseModal}
      />
    );
    const cancelButtonElement = screen.getByText("Cancel");
    expect(cancelButtonElement).toBeInTheDocument();
    fireEvent.click(cancelButtonElement);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

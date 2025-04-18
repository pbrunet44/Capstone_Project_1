// Created by Philip Brunet

import { describe, expect, it, vi, afterAll, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import EventTile from "../components/EventTile";

describe("EventTile component", () => {
  const testEvent = {
    name: "Example Event",
    description: "This is a test of rendering event descriptions.",
    isRecurring: false,
    _id: "123",
  };
  const testEvent2 = {
    name: "Example Event 2",
    description:
      "This is a test of rendering event descriptions. This description is made longer in order to test description cutoff after 90 characters.",
    isRecurring: true,
    finalizedTime: "Saturday at 1:00 PM",
    _id: "456",
  };
  it("Renders the name of the event", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent} />
      </BrowserRouter>
    );
    const nameElement = screen.getByText(testEvent.name);
    expect(nameElement).toBeInTheDocument();
  });
  it("Renders the description of the event", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent} />
      </BrowserRouter>
    );
    const descElement = screen.getByText(testEvent.description);
    expect(descElement).toBeInTheDocument();
  });
  it("Crops the description of the event if it's longer than 90 characters", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent2} />
      </BrowserRouter>
    );
    const descElement = screen.getByText(
      `${testEvent2.description.slice(0, 90)}...`
    );
    expect(descElement).toBeInTheDocument();
  });
  it("Renders a message if the event is not recurring", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent} />
      </BrowserRouter>
    );
    const recElement = screen.getByText("One-Time Event");
    expect(recElement).toBeInTheDocument();
  });
  it("Renders a message if the event is recurring", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent2} />
      </BrowserRouter>
    );
    const recElement = screen.getByText("Weekly Event");
    expect(recElement).toBeInTheDocument();
  });
  it("Renders a message if the event has been finalized", () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent2} />
      </BrowserRouter>
    );
    const finalizedElement = screen.getByText(
      `Finalized Time: ${testEvent2.finalizedTime}`
    );
    expect(finalizedElement).toBeInTheDocument();
  });
  it('Renders text that says "View Event →"', () => {
    render(
      <BrowserRouter>
        <EventTile event={testEvent} />
      </BrowserRouter>
    );
    const viewEventElement = screen.getByText("View Event →");
    expect(viewEventElement).toBeInTheDocument();
  });
});

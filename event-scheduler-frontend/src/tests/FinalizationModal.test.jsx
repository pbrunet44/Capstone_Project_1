// Created by Philip Brunet

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FinalizationModal from "../components/FinalizationModal";

describe("FinalizationModal component", () => {
  const testText = "Example Text";
  it('Renders a header with the text "Finalize the Event Time"', () => {
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const headerElement = screen.getByText("Finalize the Event Time");
    expect(headerElement).toBeInTheDocument();
  });
  it('Renders a label with the text "Day"', () => {
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const dayLabelElement = screen.getByText("Day");
    expect(dayLabelElement).toBeInTheDocument();
  });
  it('Renders a label with the text "Time"', () => {
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const timeLabelElement = screen.getByText("Time");
    expect(timeLabelElement).toBeInTheDocument();
  });
  it("Renders a Select component for choosing the day", () => {
    const { container } = render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const daySelectElement =
      container.getElementsByClassName("select-day__input");
    expect(daySelectElement.length).toBe(1);
  });
  it("Renders a Select component for choosing the time", () => {
    const { container } = render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const timeSelectElement =
      container.getElementsByClassName("select-time__input");
    expect(timeSelectElement.length).toBe(1);
  });
  it('Renders a button with the text "Finalize"', () => {
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const finalizeButtonElement = screen.getByText("Finalize");
    expect(finalizeButtonElement).toBeInTheDocument();
  });
  it('Renders a button with the text "Cancel"', () => {
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={() => {}}
      />
    );
    const cancelButtonElement = screen.getByText("Cancel");
    expect(cancelButtonElement).toBeInTheDocument();
  });
  it('Clicks the "Finalize" button, which triggers the submitFinalizationModal prop function', () => {
    const mockSubmitFinalizationModal = vi.fn();
    render(
      <FinalizationModal
        submitFinalizationModal={mockSubmitFinalizationModal}
        closeModal={() => {}}
      />
    );
    const finalizeButtonElement = screen.getByText("Finalize");
    expect(finalizeButtonElement).toBeInTheDocument();
    fireEvent.click(finalizeButtonElement);
    expect(mockSubmitFinalizationModal).toHaveBeenCalled();
  });
  it('Clicks the "Cancel" button, which triggers the closeModal prop function', () => {
    const mockCloseModal = vi.fn();
    render(
      <FinalizationModal
        submitFinalizationModal={() => {}}
        closeModal={mockCloseModal}
      />
    );
    const cancelButtonElement = screen.getByText("Cancel");
    expect(cancelButtonElement).toBeInTheDocument();
    fireEvent.click(cancelButtonElement);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Modal from "../components/Modal";

describe("Modal component", () => {
  const testText = "Example Text";
  it("Renders a Backdrop component", () => {
    render(
      <Modal>
        <p>{testText}</p>
      </Modal>
    );
    const backdropElement = screen.getByTestId("backdrop");
    expect(backdropElement).toBeInTheDocument();
  });
  it("Renders the child prop", () => {
    render(
      <Modal>
        <p>{testText}</p>
      </Modal>
    );
    const pElement = screen.getByText(testText);
    expect(pElement).toBeInTheDocument();
  });
});

// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Backdrop from "../components/Backdrop";

describe("Backdrop component", () => {
  it("Renders a div tag", () => {
    render(<Backdrop />);
    const backdropElement = screen.getByTestId("backdrop");
    expect(backdropElement).toBeInTheDocument();
  });
});

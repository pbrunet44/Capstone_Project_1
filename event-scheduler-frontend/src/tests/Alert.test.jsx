// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Alert from "../components/Alert";

describe("Alert component", () => {
  it("Renders the specified text in a paragraph tag", () => {
    const testText = "Example Text";
    render(<Alert msg={testText} isErr={false} />);
    const pElement = screen.getByText(testText);
    expect(pElement).toBeInTheDocument();
  });
});

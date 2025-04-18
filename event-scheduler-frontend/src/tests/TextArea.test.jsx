// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TextArea from "../components/TextArea";

describe("TextArea component", () => {
  const testLabel = "Example Text";
  const testValue = "Value";
  const testName = "test";
  it("Renders a label with the specified text", () => {
    render(
      <TextArea
        name={testName}
        value={testValue}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const labelElement = screen.getByText(testLabel);
    expect(labelElement).toBeInTheDocument();
  });
  it("Renders a text area with the specified name as the default placeholder text", () => {
    render(
      <TextArea
        name={testName}
        value={testValue}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const areaElement = screen.getByPlaceholderText(testName);
    expect(areaElement).toBeInTheDocument();
  });
});

// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TextInput from "../components/TextInput";

describe("TextInput component", () => {
  const testLabel = "Example Text";
  const testValue = "Value";
  const testName = "test";
  it("Renders a label with the specified text", () => {
    render(
      <TextInput
        name={testName}
        value={testValue}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const labelElement = screen.getByText(testLabel);
    expect(labelElement).toBeInTheDocument();
  });
  it("Renders an input with the specified name as the default placeholder text", () => {
    render(
      <TextInput
        name={testName}
        value={testValue}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const inputElement = screen.getByPlaceholderText(testName);
    expect(inputElement).toBeInTheDocument();
  });
});

// Created by Philip Brunet

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CheckboxInput from "../components/CheckboxInput";

describe("CheckboxInput component", () => {
  const testLabel = "Example Text";
  const testValue = "Value";
  const testName = "test";
  const testChecked = true;
  it("Renders a label with the specified text", () => {
    render(
      <CheckboxInput
        name={testName}
        checked={testChecked}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const labelElement = screen.getByText(testLabel);
    expect(labelElement).toBeInTheDocument();
  });
  it("Renders a checkbox input with the specified boolean value", () => {
    render(
      <CheckboxInput
        name={testName}
        checked={testChecked}
        onChange={() => {}}
        labelText={testLabel}
      />
    );
    const checkboxElement = screen.getByRole("checkbox", {
      checked: testChecked,
    });
    expect(checkboxElement).toBeInTheDocument();
  });
});

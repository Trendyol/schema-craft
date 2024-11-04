import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import CodeMirror from "@uiw/react-codemirror";

import JsonSchemaViewer from "../json-schema-viewer";

jest.mock("@uiw/react-codemirror", () => jest.fn());

describe("JsonSchemaViewer", () => {
  beforeEach(() => {
    (CodeMirror as unknown as jest.Mock).mockImplementation(({ value }) => {
      return <textarea data-testid="json-schema-viewer" value={value} readOnly />;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with null jsonSchema", () => {
    render(<JsonSchemaViewer jsonSchema={null} />);

    const viewer = screen.getByTestId("json-schema-viewer");
    expect(viewer).toBeInTheDocument();
    expect(viewer).toHaveValue("");
  });

  test("renders with provided jsonSchema", () => {
    const testSchema = { name: "test", type: "object" };

    render(<JsonSchemaViewer jsonSchema={testSchema} />);

    const viewer = screen.getByTestId("json-schema-viewer");
    expect(viewer).toBeInTheDocument();
    expect(viewer).toHaveValue(JSON.stringify(testSchema, null, 4));
  });

  test("renders with editable set to false", () => {
    render(<JsonSchemaViewer jsonSchema={{ name: "test" }} />);

    const viewer = screen.getByTestId("json-schema-viewer");
    expect(viewer).toBeInTheDocument();
    expect(viewer).toHaveAttribute("readonly");
  });
});

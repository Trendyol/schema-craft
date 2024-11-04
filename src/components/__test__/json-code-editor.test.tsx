import { render, screen, fireEvent } from "@testing-library/react";

import CodeMirror from "@uiw/react-codemirror";

import JsonCodeEditor from "../json-code-editor";

jest.mock("@uiw/react-codemirror", () => jest.fn());

describe("JsonCodeEditor", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    (CodeMirror as unknown as jest.Mock).mockImplementation(({ onChange, ...props }) => {
      return <textarea {...props} data-testid="json-editor" onChange={(e) => onChange?.(e.target.value)} />;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default props", () => {
    render(<JsonCodeEditor rawJson={null} onChange={mockOnChange} />);

    const textarea = screen.getByTestId("json-editor");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("");
  });

  test("renders with provided rawJson", () => {
    const testJson = '{"name": "test"}';

    render(<JsonCodeEditor rawJson={testJson} onChange={mockOnChange} />);

    const textarea = screen.getByTestId("json-editor");

    expect(textarea).toHaveValue(testJson);
  });

  test("calls onChange when edited", () => {
    render(<JsonCodeEditor rawJson={null} onChange={mockOnChange} />);

    const textarea = screen.getByTestId("json-editor");

    fireEvent.change(textarea, { target: { value: '{"updated": true}' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('{"updated": true}');
  });
});

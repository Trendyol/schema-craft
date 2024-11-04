import { render, screen, fireEvent } from "@testing-library/react";

import ProgressionButtons from "../progression-buttons";

jest.mock("@ant-design/icons", () => ({
  ArrowLeftOutlined: jest.fn(() => <div data-testid="left-icon" />),
  ArrowRightOutlined: jest.fn(() => <div data-testid="right-icon" />),
  CopyOutlined: jest.fn(() => <div data-testid="copy-icon" />),
}));

describe("ProgressionButtons", () => {
  const mockOnPrev = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnCopy = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Previous button when currentStep > 0", () => {
    render(
      <ProgressionButtons currentStep={1} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeTruthy(); // React DOM kullanımı için toBeInTheDocument yerine toBeTruthy kullanıyoruz
  });

  test("renders Next button when currentStep < maxStep", () => {
    render(
      <ProgressionButtons currentStep={1} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeTruthy();
  });

  test("renders Copy to clipboard button when currentStep === maxStep", () => {
    render(
      <ProgressionButtons currentStep={3} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const copyButton = screen.getByText("Copy to clipboard");
    expect(copyButton).toBeTruthy();
  });

  test("calls onPrev when Previous button is clicked", () => {
    render(
      <ProgressionButtons currentStep={1} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  test("calls onNext when Next button is clicked", () => {
    render(
      <ProgressionButtons currentStep={1} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test("calls onCopy when Copy to clipboard button is clicked", () => {
    render(
      <ProgressionButtons currentStep={3} maxStep={3} onPrev={mockOnPrev} onNext={mockOnNext} onCopy={mockOnCopy} />
    );

    const copyButton = screen.getByText("Copy to clipboard");
    fireEvent.click(copyButton);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });
});
